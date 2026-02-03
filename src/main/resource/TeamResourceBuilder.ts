import { PathBuilder } from "../PathBuilder";
import { PermitGet } from "../PermitGet";
import { RequestExecutor } from "../RequestExecutor";
import { TeamResponse, TeamResponseSchema } from "../schema/TeamSchema";

export class TeamResourceBuilder implements PermitTeamKey, PermitMatchupsOrStatsOrGet<TeamResponse> {
    private readonly executor: RequestExecutor;
    private readonly pathBuilder: PathBuilder;

    private constructor(executor: RequestExecutor, pathBuilder: PathBuilder) {
        this.executor = executor;
        this.pathBuilder = pathBuilder;
    }

    static create(executor: RequestExecutor): PermitTeamKey {
        return new TeamResourceBuilder(executor, new PathBuilder('/team'));
    }

    teamKey(teamKey: string): PermitMatchupsOrStatsOrGet<TeamResponse> {
        this.pathBuilder.withResource(teamKey);
        return this;
    }

    matchups(): MatchupsSubResource {
        return MatchupsSubResource.create(this.executor, this.pathBuilder);
    }

    stats(): StatsSubResource {
        return StatsSubResource.create(this.executor, this.pathBuilder);
    }

    async get(): Promise<TeamResponse> {
        return await this.executor
            .makeGetRequest(this.pathBuilder.buildPath(), TeamResponseSchema);
    }

}

class MatchupsSubResource implements PermitGet<string> {

    // filters
    private readonly _weeks: string[] = [];

    private readonly executor: RequestExecutor;
    private readonly pathBuilder: PathBuilder;

    private constructor(executor: RequestExecutor, pathBuilder: PathBuilder) {
        this.executor = executor;
        this.pathBuilder = pathBuilder;
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new MatchupsSubResource(executor, pathBuilder);
    }

    weeks(weeks: number[]): PermitGet<string> {
        // convert to string for filter param logic
        const weeksAsString: string[] = weeks.map((week: number) => {
            return week.toString();
        });

        this._weeks.push(...weeksAsString);
        return this;
    }

    async get(): Promise<string> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        if (this._weeks.length > 0) {
            filterParams.set('weeks', this._weeks);
        }

        return await Promise.resolve("foo");
    }
}

class StatsSubResource implements PermitGet<string>{

    // filters
    private type: string | undefined = undefined;

    private readonly executor: RequestExecutor;
    private readonly pathBuilder: PathBuilder;

    private constructor(executor: RequestExecutor, pathBuilder: PathBuilder) {
        this.executor = executor;
        this.pathBuilder = pathBuilder;
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new StatsSubResource(executor, pathBuilder);
    }

    season(season: number): PermitGet<string> {
        return this;
    }

    date(date: Date): PermitGet<string> {
        return this;
    }

    async get(): Promise<string> {
        return await Promise.resolve('foo');
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