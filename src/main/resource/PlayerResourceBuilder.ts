import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { PlayerDraftAnalysisResponse, PlayerDraftAnalysisResponseSchema, PlayerPercentOwnedReponseSchema, PlayerPercentOwnedResponse, PlayerResponse, PlayerStatsResponse, PlayerStatsResponseSchema } from '../schema/PlayerSchema';

export class PlayerResourceBuilder extends ExecutableResource<PlayerResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(schema: ZodType, executor: RequestExecutor, playerKey: string): PlayerResourceBuilder {
        return new PlayerResourceBuilder(schema, executor, new PathBuilder('/player').withResource(playerKey));
    }

    draftAnalysis(): ExecutableResource<PlayerDraftAnalysisResponse> {
        return PlayerDraftAnalysisSubResource.create(
            PlayerDraftAnalysisResponseSchema, this.executor, this.pathBuilder.withResource('draft_analysis')
        );
    }

    percentOwned(): ExecutableResource<PlayerPercentOwnedResponse> {
        return PlayerPercentOwnedSubResource.create(
            PlayerPercentOwnedReponseSchema, this.executor, this.pathBuilder.withResource('percent_owned')
        );
    }

    stats(): ExecutableResource<PlayerStatsResponse> {
        return PlayerStatsSubResource.create(
            PlayerStatsResponseSchema, this.executor, this.pathBuilder.withResource('stats')
        );
    }
}

class PlayerDraftAnalysisSubResource extends ExecutableResource<PlayerDraftAnalysisResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<PlayerDraftAnalysisResponse> {
        return new PlayerDraftAnalysisSubResource(schema, executor, pathBuilder);
    }
}

class PlayerPercentOwnedSubResource extends ExecutableResource<PlayerPercentOwnedResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<PlayerPercentOwnedResponse> {
        return new PlayerPercentOwnedSubResource(schema, executor, pathBuilder);
    }
}

class PlayerStatsSubResource extends ExecutableResource<PlayerStatsResponse> {
    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<PlayerStatsResponse> {
        return new PlayerStatsSubResource(schema, executor, pathBuilder);
    }
}