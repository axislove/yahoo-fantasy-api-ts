import { ExecutableResource } from '../ExecutableResource';
import { LeaguePlayerResponse, LeaguePlayerStatsResponse, LeaguePlayerStatsResponseSchema } from '../schema/league/LeaguePlayerSchema';

export class PlayerResourceBuilder extends ExecutableResource<LeaguePlayerResponse> {

    stats(): LeaguePlayerStatsSubResource {
        return new LeaguePlayerStatsSubResource(
            LeaguePlayerStatsResponseSchema, this.executor, this.pathBuilder.withResource('stats')
        );
    }
}

class LeaguePlayerStatsSubResource extends ExecutableResource<LeaguePlayerStatsResponse> {}