import { ZodType } from 'zod';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { ExecutableResource } from '../ExecutableResource';
import { LeagueResponse, LeagueResponseSchema } from '../schema/league/LeagueSchema';
import { LeagueTransactionsResponse, LeagueTransactionsResponseSchema } from '../schema/TransactionsSchema';
import { LeagueSettingsResponse, LeagueSettingsResponseSchema } from '../schema/SettingsSchema';
import { LeagueStandingsResponse, LeagueStandingsResponseSchema } from '../schema/StandingsSchema';
import { LeagueScoreboardResponse, LeagueScoreboardResponseSchema } from '../schema/ScoreboardSchema';
import { LeagueDraftResultsResponse, LeagueDraftResultsResponseSchema } from '../schema/DraftResultsSchema';
import { LeagueTeamsResponse, LeagueTeamsResponseSchema } from '../schema/league/LeagueTeamsSchema';
import { LeaguePlayersResponse, LeaguePlayersResponseSchema } from '../schema/league/LeaguePlayersSchema';
import { PlayerStatus } from '../enum/PlayerStatus';
import { PlayerSort } from '../enum/PlayerSort';
import { PlayerSortType } from '../enum/PlayerSortType';
import { PlayerPosition } from '../enum/PlayerPosition';
import { TeamsCollectionBuilder } from '../collection/TeamsCollectionBuilder';
import { DraftResultsSubResource } from '../subresources/DraftResultsSubResource';
import { ScoreboardSubResource } from '../subresources/ScoreboardSubResource';
import { SettingsSubResource } from '../subresources/SettingsSubResource';
import { StandingsSubResource } from '../subresources/StandingsSubResource';
import { TransactionsSubResource } from '../subresources/TransactionsSubResource';

/**
 * https://developer.yahoo.com/fantasysports/guide/#league-resource
 */
export class LeagueResourceBuilder extends ExecutableResource<LeagueResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(leagueKey: string, executor: RequestExecutor) {
        return new LeagueResourceBuilder(LeagueResponseSchema, executor, new PathBuilder(`/league/${leagueKey}`));
    }

    draftResults(): ExecutableResource<LeagueDraftResultsResponse> {
        return DraftResultsSubResource.create<LeagueDraftResultsResponse>(
            LeagueDraftResultsResponseSchema, this.executor, this.pathBuilder.withResource('draftresults')
        );
    }

    players(): PlayersSubResource {
        return PlayersSubResource.create(this.executor, this.pathBuilder.withResource('players'));
    }

    scoreboard(): ScoreboardSubResource<LeagueScoreboardResponse> {
        return ScoreboardSubResource.create<LeagueScoreboardResponse>(
            LeagueScoreboardResponseSchema, this.executor, this.pathBuilder.withResource('scoreboard')
        );
    }

    settings(): ExecutableResource<LeagueSettingsResponse> {
        return SettingsSubResource.create<LeagueSettingsResponse>(
            LeagueSettingsResponseSchema, this.executor, this.pathBuilder.withResource('settings')
        );
    }

    standings(): ExecutableResource<LeagueStandingsResponse> {
        return StandingsSubResource.create<LeagueStandingsResponse>(
            LeagueStandingsResponseSchema, this.executor, this.pathBuilder.withResource('standings')
        );
    }

    teams(): TeamsCollectionBuilder<LeagueTeamsResponse> {
        return new TeamsCollectionBuilder<LeagueTeamsResponse>(
            LeagueTeamsResponseSchema, this.executor, this.pathBuilder.withResource('teams')
        );
    }

    transactions(): TransactionsSubResource<LeagueTransactionsResponse> {
        return TransactionsSubResource.create<LeagueTransactionsResponse>(
            LeagueTransactionsResponseSchema, this.executor, this.pathBuilder.withResource('transactions')
        );
    }
}

class PlayersSubResource extends ExecutableResource<LeaguePlayersResponse> {

    private _position: PlayerPosition | undefined = undefined;
    private _status: PlayerStatus | undefined = undefined;
    private _search: string | undefined = undefined;
    private _sort: PlayerSort | undefined = undefined;
    private _sortType: PlayerSortType | undefined = undefined;
    private _sort_season: string | undefined = undefined;
    private _sort_week: string | undefined = undefined;
    private _start: string | undefined = undefined;
    private _count: string | undefined = undefined;

    private readonly _playerKeys: string[] = [];

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }
    
    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new PlayersSubResource(LeaguePlayersResponseSchema, executor, pathBuilder);
    }

    position(position: PlayerPosition): this {
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

    sort(sort: PlayerSort): this {
        this._sort = sort;
        return this;
    }

    sortType(sortType: PlayerSortType): this {
        this._sortType = sortType;
        return this;
    }

    sortSeason(season: string): this {
        this._sort_season = season;
        return this;
    }

    sortWeek(week: string): this {
        this._sort_week = week;
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

    playerKeys(playerKeys: string[]): this {
        this._playerKeys.push(...playerKeys);
        return this;
    }

    async get(): Promise<LeaguePlayersResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        if (this._position) {
            filterParams.set('position', [this._position]);
        }
        if (this._status) {
            filterParams.set('status', [this._status]);
        }
        if (this._search) {
            filterParams.set('search', [this._search]);
        }
        if (this._sort) {
            filterParams.set('sort', [this._sort]);
        }
        if (this._sortType) {
            filterParams.set('sort_type', [this._sortType]);
        }
        if (this._sort_season) {
            filterParams.set('sort_season', [this._sort_season]);
        }
        if (this._sort_week) {
            filterParams.set('sort_week', [this._sort_week]);
        }
        if (this._start) {
            filterParams.set('start', [this._start]);
        }
        if (this._count) {
            filterParams.set('count', [this._count]);
        }
        if (this._playerKeys.length > 0) {
            filterParams.set('player_keys', this._playerKeys);
        }

        return this.executor.makeGetRequest(this.pathBuilder.withParams(filterParams).buildPath(), LeaguePlayersResponseSchema);
    }
}