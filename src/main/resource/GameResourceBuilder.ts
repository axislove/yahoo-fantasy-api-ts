import { GameResponse, GameResponseSchema } from '../schema/GameSchema';
import { RequestExecutor } from '../RequestExecutor';
import { GameCode } from '../enum/GameCode';
import { PathBuilder } from '../PathBuilder';
import { ExecutableResource } from '../ExecutableResource';
import { ZodType } from 'zod';

/**
 * https://developer.yahoo.com/fantasysports/guide/#game-resource
 * 
 * To obtain a Game resource, client must provide a game_key, which is either
 * a 'game_id' or 'game_code'. A 'game_id' is a unique ID that identifies a fantasy
 * season. A 'game_code' identifies a game and will return the current season of that
 * game when used as a 'game_key'.
 */
export class GameResourceBuilder extends ExecutableResource<GameResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(gameKey: GameCode | string, executor: RequestExecutor): ExecutableResource<GameResponse> {
        return new GameResourceBuilder(GameResponseSchema, executor, new PathBuilder('/game').withResource(gameKey));
    }
}