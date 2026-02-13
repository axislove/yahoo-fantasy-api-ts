import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { LeaguePlayerStatsResponse } from '../schema/league/LeaguePlayerSchema';

export class PlayerResourceBuilder<T> extends ExecutableResource<T> {

    private readonly playerKey: string;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder, playerKey: string) {
        super(schema, executor, pathBuilder);
        this.playerKey = playerKey;
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, playerKey: string): PlayerResourceBuilder<U> {
        return new PlayerResourceBuilder(schema, executor, new PathBuilder('/player').withResource(playerKey), playerKey);
    }

    stats(): LeaguePlayerStatsSubResource {
        return new LeaguePlayerStatsSubResource(
            this.schema, this.executor, this.pathBuilder.withResource('stats')
        );
    }
}

class LeaguePlayerStatsSubResource extends ExecutableResource<LeaguePlayerStatsResponse> {}