import { ZodType } from "zod";
import { PathBuilder } from "../PathBuilder";
import { RequestExecutor } from "../RequestExecutor";
import { ExecutableResource } from "../ExecutableResource";
import { LeagueResponse, LeagueResponseSchema } from "../schema/LeagueSchema";
import { LeagueTransactionsResponse, LeagueTransactionsResponseSchema } from "../schema/TransactionsSchema";
import { TransactionType } from "../enum/TransactionType";
import { LeagueSettingsResponse, LeagueSettingsResponseSchema } from "../schema/SettingsSchema";
import { LeagueStandingsResponse, LeagueStandingsResponseSchema } from "../schema/StandingsSchema";
import { LeagueScoreboardResponse, LeagueScoreboardResponseSchema } from "../schema/ScoreboardSchema";
import { LeagueDraftResultsResponse, LeagueDraftResultsResponseSchema } from "../schema/DraftResultsSchema";
import { LeagueTeamsResponse, LeagueTeamsResponseSchema } from "../schema/LeagueTeamsSchema";
import { LeaguePlayersResponse } from "../schema/LeaguePlayersSchema";
import { PlayerStatus } from "../enum/PlayerStatus";

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

    players() {
        return PlayersSubResource.create(this.executor, this.pathBuilder.withResource('players'));
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

class PlayersSubResource extends ExecutableResource<LeaguePlayersResponse> {

    private _position: string | undefined = undefined;
    private _status: PlayerStatus | undefined = undefined;
    private _search: string | undefined = undefined;
    private _sort: string | undefined = undefined;
    private _sort_type: string | undefined = undefined;
    private _sort_season: string | undefined = undefined;
    private _sort_week: string | undefined = undefined;
    private _start: string | undefined = undefined;
    private _count: string | undefined = undefined;

    //TODO: sort_date (baseball, basketball, hockey only)

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new PlayersSubResource(LeagueDraftResultsResponseSchema, executor, pathBuilder);
    }

    position(position: string) {
        this._position = position;
        return this;
    }

    status(status: PlayerStatus): this {
        this._status = status;
        return this;
    }

    search(name: string): this {
        this._search = name;
        return this;
    }

    sort(sort: string): this {
        this._sort = sort;
        return this;
    }

    sortType(sortType: string): this {
        this._sort_type = sortType;
        return this;
    }

    sortSeason(sortSeason: string): this {
        this._sort_season = sortSeason;
        return this;
    }

    sortWeek(week: number): this {
        this._sort_week = week.toString();
        return this;
    }

    start(start: number): this {
        this._start = start.toString();
        return this;
    }

    count(count: number): this {
        this._count = count.toString();
        return this;
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
            filterParams.set('count', [this.count.toString()])
        }

        return this.executor.makeGetRequest(this.pathBuilder.withParams(filterParams).buildPath(), LeagueTransactionsResponseSchema);
    }
}

class ScoreboardSubResource extends ExecutableResource<LeagueScoreboardResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new ScoreboardSubResource(LeagueScoreboardResponseSchema, executor, pathBuilder);
    }

    week(week: number): ExecutableResource<LeagueScoreboardResponse> {
        this.pathBuilder.withParam('week', week.toString());
        return this;
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