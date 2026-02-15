import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { LeaguesDraftResultsResponse, LeaguesDraftResultsSchema, LeaguesResponse, LeaguesScoreboardResponse, LeaguesScoreboardResponseSchema, LeaguesSettingsResponse, LeaguesSettingsResponseSchema, LeaguesStandingsResponse, LeaguesStandingsResponseSchema, LeaguesTeamsResponse, LeaguesTeamsResponseSchema, LeaguesTransactionsResponse, LeaguesTransactionsResponseSchema } from '../schema/league/LeaguesSchema';
import { DraftResultsSubResource } from '../subresources/DraftResultsSubResource';
import { TeamsCollectionBuilder } from './TeamsCollectionBuilder';
import { ScoreboardSubResource } from '../subresources/ScoreboardSubResource';
import { SettingsSubResource } from '../subresources/SettingsSubResource';
import { StandingsSubResource } from '../subresources/StandingsSubResource';
import { TransactionsSubResource } from '../subresources/TransactionsSubResource';

/**
 * https://developer.yahoo.com/fantasysports/guide/#leagues-collection
 * 
 * TODO: implement players() API
 * 
 * Note: players is supported within a Leagues context, but I don't see the need
 * for a relatively advanced API query of this kind. For now, leave as unimplemented.
 */
export class LeaguesCollectionBuilder extends ExecutableResource<LeaguesResponse> {
 
    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(leagueKeys: string[], schema: ZodType, executor: RequestExecutor) {
        const leagues: Map<string, string[]> = new Map<string, string[]>();
        leagues.set('league_keys', leagueKeys);
        return new LeaguesCollectionBuilder(schema, executor, new PathBuilder('/leagues').withParams(leagues));
    }

    draftResults(): ExecutableResource<LeaguesDraftResultsResponse> {
        return DraftResultsSubResource.create(
            LeaguesDraftResultsSchema, this.executor, this.pathBuilder.withResource('draftresults')
        );
    }

    scoreboard(): ScoreboardSubResource<LeaguesScoreboardResponse> {
        return ScoreboardSubResource.create<LeaguesScoreboardResponse>(
            LeaguesScoreboardResponseSchema, this.executor, this.pathBuilder.withResource('scoreboard')
        );
    }

    settings(): ExecutableResource<LeaguesSettingsResponse> {
        return SettingsSubResource.create<LeaguesSettingsResponse>(
            LeaguesSettingsResponseSchema, this.executor, this.pathBuilder.withResource('settings')
        );
    }

    standings(): ExecutableResource<LeaguesStandingsResponse> {
        return StandingsSubResource.create<LeaguesStandingsResponse>(
            LeaguesStandingsResponseSchema, this.executor, this.pathBuilder.withResource('standings')
        );
    }

    teams(): ExecutableResource<LeaguesTeamsResponse> {
        return new TeamsCollectionBuilder(LeaguesTeamsResponseSchema, this.executor, this.pathBuilder.withResource('teams'));
    }

    transactions(): TransactionsSubResource<LeaguesTransactionsResponse> {
        return TransactionsSubResource.create<LeaguesTransactionsResponse>(
            LeaguesTransactionsResponseSchema, this.executor, this.pathBuilder.withResource('transactions')
        );
    }
}