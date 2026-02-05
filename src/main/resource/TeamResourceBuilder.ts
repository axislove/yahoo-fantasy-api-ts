import { ZodType } from "zod";
import { PathBuilder } from "../PathBuilder";
import { RequestExecutor } from "../RequestExecutor";
import { TeamMatchupsResponse, TeamMatchupsResponseSchema } from "../schema/TeamMatchupsSchema";
import { TeamResponse, TeamResponseSchema, TeamStatsResponse, TeamStatsResponseSchema } from "../schema/TeamSchema";
import { ExecutableResource } from "../ExecutableResource";

export class TeamResourceBuilder extends ExecutableResource<TeamResponse> implements PermitTeamKey, PermitMatchupsOrStatsOrGet<TeamResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): PermitTeamKey {
        return new TeamResourceBuilder(TeamResponseSchema, executor, new PathBuilder('/team'));
    }

    teamKey(teamKey: string): PermitMatchupsOrStatsOrGet<TeamResponse> {
        this.pathBuilder.withResource(teamKey);
        return this;
    }

    matchups(): MatchupsSubResource {
        this.pathBuilder.withResource('matchups');
        return MatchupsSubResource.create(this.executor, this.pathBuilder);
    }

    stats(): StatsSubResource {
        this.pathBuilder.withResource('stats');
        return StatsSubResource.create(this.executor, this.pathBuilder);
    }
}

class MatchupsSubResource extends ExecutableResource<TeamMatchupsResponse> {

    // filters
    private readonly _weeks: string[] = [];

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new MatchupsSubResource(TeamMatchupsResponseSchema, executor, pathBuilder);
    }

    weeks(weeks: number[]): ExecutableResource<TeamMatchupsResponse> {
        // convert to string for filter param logic
        const weeksAsString: string[] = weeks.map((week: number) => {
            return week.toString();
        });

        this._weeks.push(...weeksAsString);
        return this;
    }

    async get(): Promise<TeamMatchupsResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        if (this._weeks.length > 0) {
            filterParams.set('weeks', this._weeks);
            this.pathBuilder.withParams(filterParams);
        }

        return await this.executor.makeGetRequest(this.pathBuilder.buildPath(), TeamMatchupsResponseSchema);
    }
}

class StatsSubResource extends ExecutableResource<TeamStatsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new StatsSubResource(TeamStatsResponseSchema, executor, pathBuilder);
    }

    season(): ExecutableResource<TeamStatsResponse> {
        this.pathBuilder.withParam('type', 'season');
        return this;
    }

    date(date: Date): ExecutableResource<TeamStatsResponse> {
        this.pathBuilder.withParam('type', 'date');
        this.pathBuilder.withParam('date', date.toString());
        return this;
    }
}

export interface PermitTeamKey {
    teamKey(teamKey: string): PermitMatchupsOrStatsOrGet<TeamResponse>;
}

interface PermitMatchupsOrStatsOrGet<T> {
    matchups(): MatchupsSubResource;
    stats(): StatsSubResource;
    get(): Promise<T>;
}