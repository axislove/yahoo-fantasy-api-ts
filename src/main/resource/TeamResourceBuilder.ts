import { ZodType } from 'zod';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { TeamMatchupsResponse, TeamMatchupsResponseSchema } from '../schema/TeamMatchupsSchema';
import { TeamResponse, TeamResponseSchema, TeamRosterResponse, TeamRosterResponseSchema, TeamStatsResponse, TeamStatsResponseSchema } from '../schema/TeamSchema';
import { ExecutableResource } from '../ExecutableResource';

export class TeamResourceBuilder extends ExecutableResource<TeamResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(teamKey: string, executor: RequestExecutor) {
        return new TeamResourceBuilder(TeamResponseSchema, executor, new PathBuilder(`/team/${teamKey}`));
    }

    matchups(): MatchupsSubResource {
        return MatchupsSubResource.create(this.executor, this.pathBuilder.withResource('matchups'));
    }

    roster(): RosterSubResource {
        return RosterSubResource.create(this.executor, this.pathBuilder.withResource('roster'));
    }

    stats(): StatsSubResource {
        return StatsSubResource.create(this.executor, this.pathBuilder.withResource('stats'));
    }
}

class MatchupsSubResource extends ExecutableResource<TeamMatchupsResponse> {

    private _weeks: string[] = [];

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new MatchupsSubResource(TeamMatchupsResponseSchema, executor, pathBuilder);
    }

    weeks(weeks: number[]): ExecutableResource<TeamMatchupsResponse> {

        // convert to string for filter param logic
        const weeksAsStrings: string[] = weeks.map((week: number) => {
            return week.toString();
        });

        this._weeks.push(...weeksAsStrings);


        return this;
    }

    async get(): Promise<TeamMatchupsResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        let pb = this.pathBuilder;
        if (this._weeks.length > 0) {
            filterParams.set('weeks', this._weeks);
            pb = this.pathBuilder.withParams(filterParams);
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}

// TODO: add 'date filter for non-nfl games
class RosterSubResource extends ExecutableResource<TeamRosterResponse> {

    private _week: string | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new RosterSubResource(TeamRosterResponseSchema, executor, pathBuilder);
    }

    week(week: number): ExecutableResource<TeamRosterResponse> {
        this._week = week.toString();
        return this;
    }

    async get(): Promise<TeamRosterResponse> {
        let pb = this.pathBuilder;
        if (this._week) {
            pb = this.pathBuilder.withParam('week', this._week);
        }
        
        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}

// TODO: add 'date' filter for non-nfl games
class StatsSubResource extends ExecutableResource<TeamStatsResponse> {

    private type: string | undefined = undefined;
    private _week: string | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new StatsSubResource(TeamStatsResponseSchema, executor, pathBuilder);
    }

    season(): ExecutableResource<TeamStatsResponse> {
        this.type = 'season';
        return this;
    }

    week(week: number): ExecutableResource<TeamStatsResponse> {
        this.type = 'week';
        this._week = week.toString();
        return this;
    }

    async get(): Promise<TeamStatsResponse> {
        let pb = this.pathBuilder;
        if (this.type) {
            pb = pb.withParam('type', this.type);
        }
        if (this._week) {
            pb = pb.withParam('week', this._week);
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}