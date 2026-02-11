import { ZodType } from 'zod';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { ExecutableResource } from '../ExecutableResource';
import { LeagueResponse, LeagueResponseSchema } from '../schema/LeagueSchema';
import { LeagueTransactionsResponse, LeagueTransactionsResponseSchema } from '../schema/TransactionsSchema';
import { TransactionType } from '../enum/TransactionType';
import { LeagueSettingsResponse, LeagueSettingsResponseSchema } from '../schema/SettingsSchema';
import { LeagueStandingsResponse, LeagueStandingsResponseSchema } from '../schema/StandingsSchema';
import { LeagueScoreboardResponse, LeagueScoreboardResponseSchema } from '../schema/ScoreboardSchema';
import { LeagueDraftResultsResponse, LeagueDraftResultsResponseSchema } from '../schema/DraftResultsSchema';
import { LeagueTeamsResponse, LeagueTeamsResponseSchema } from '../schema/LeagueTeamsSchema';

export class LeagueResourceBuilder extends ExecutableResource<LeagueResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(leagueKey: string, executor: RequestExecutor) {
        return new LeagueResourceBuilder(LeagueResponseSchema, executor, new PathBuilder(`/league/${leagueKey}`));
    }

    draftResults(): ExecutableResource<LeagueDraftResultsResponse> {
        return DraftResultsSubResource.create(this.executor, this.pathBuilder.withResource('draftresults'));
    }

    teams(): ExecutableResource<LeagueTeamsResponse> {
        return TeamsSubResource.create(this.executor, this.pathBuilder.withResource('teams'));
    }

    transactions(): TransactionsSubResource {
        return TransactionsSubResource.create(this.executor, this.pathBuilder.withResource('transactions'));
    }

    scoreboard(): ScoreboardSubResource {
        return ScoreboardSubResource.create(this.executor, this.pathBuilder.withResource('scoreboard'));
    }

    settings(): ExecutableResource<LeagueSettingsResponse> {
        return SettingsSubResource.create(this.executor, this.pathBuilder.withResource('settings'));
    }

    standings(): ExecutableResource<LeagueStandingsResponse> {
        return StandingsSubResource.create(this.executor, this.pathBuilder.withResource('standings'));
    }
}

class DraftResultsSubResource extends ExecutableResource<LeagueDraftResultsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<LeagueDraftResultsResponse> {
        return new DraftResultsSubResource(LeagueDraftResultsResponseSchema, executor, pathBuilder);
    }
}

class TeamsSubResource extends ExecutableResource<LeagueTeamsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<LeagueTeamsResponse> {
        return new TeamsSubResource(LeagueTeamsResponseSchema, executor, pathBuilder);
    }
}

// TODO: figure out how to restrict functions, for now just allow user to reach all functions
class TransactionsSubResource extends ExecutableResource<LeagueTransactionsResponse> {

    private type: TransactionType | undefined = undefined;
    private types: TransactionType[] = [];
    private team_key: string | undefined = undefined;
    private _count: number | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder)  {
        return new TransactionsSubResource(LeagueTransactionsResponseSchema, executor, pathBuilder);
    }

    withType(type: TransactionType): this {
        this.type = type;
        return this;
    }

    withTypes(types: TransactionType[]): this {
        this.types = types;
        return this;
    }

    withTeamKey(teamKey: string): this {
        this.team_key = teamKey;
        return this;
    }

    count(count: number): this {
        this._count = count;
        return this;
    }

    async get(): Promise<LeagueTransactionsResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();
        
        if (this.type) {
            filterParams.set('type', [this.type.toString()]);
        }
        if (this.types.length > 0) {
            filterParams.set('types', this.types);
        }
        if (this.team_key) {
            filterParams.set('team_key', [this.team_key]);
        }
        if (this._count) {
            filterParams.set('count', [this._count.toString()])
        }

        return this.executor.makeGetRequest(this.pathBuilder.withParams(filterParams).buildPath(), LeagueTransactionsResponseSchema);
    }
}

class ScoreboardSubResource extends ExecutableResource<LeagueScoreboardResponse> {

    private _week: string | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new ScoreboardSubResource(LeagueScoreboardResponseSchema, executor, pathBuilder);
    }

    week(week: number): ExecutableResource<LeagueScoreboardResponse> {
        this._week = week.toString();
        return this;
    }

    async get(): Promise<LeagueScoreboardResponse> {
        let pb = this.pathBuilder;
        if (this._week) {
            pb = this.pathBuilder.withParam('week', this._week);
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}

class SettingsSubResource extends ExecutableResource<LeagueSettingsResponse> {
    
    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<LeagueSettingsResponse> {
        return new SettingsSubResource(LeagueSettingsResponseSchema, executor, pathBuilder);
    }
}

class StandingsSubResource extends ExecutableResource<LeagueStandingsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new StandingsSubResource(LeagueStandingsResponseSchema, executor, pathBuilder);
    }
}