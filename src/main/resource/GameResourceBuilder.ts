import { GameResponse, GameResponseSchema } from "../schema/GameSchema";
import { RequestExecutor } from "../RequestExecutor";
import { GameCode } from "../enum/GameCode";
import { PathBuilder } from "../PathBuilder";
import { ExecutableResource } from "../ExecutableResource";
import { ZodType } from "zod";

/**
 * https://developer.yahoo.com/fantasysports/guide/#game-resource
 * 
 * To obtain a Game resource, client must provide a game_key, which is either
 * a 'game_id' or 'game_code'. A 'game_id' is a unique ID that identifies a fantasy
 * season. A 'game_code' identifies a game and will return the current season of that
 * game when used as a 'game_key'.
 * 
 * More information available on Yahoo's documentation
 */
export class GameResourceBuilder extends ExecutableResource<GameResponse> implements PermitGameKey {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): PermitGameKey {
        return new GameResourceBuilder(GameResponseSchema, executor, new PathBuilder('/game'));
    }

    withGameCode(gameCode: GameCode): ExecutableResource<GameResponse> {
        this.pathBuilder.withResource(gameCode);
        return this;
    }

    withGameId(gameId: string): ExecutableResource<GameResponse> {
        this.pathBuilder.withResource(gameId);
        return this;
    }
}

export interface PermitGameKey {
    withGameCode(gameCode: GameCode): ExecutableResource<GameResponse>;
    withGameId(gameId: string): ExecutableResource<GameResponse>;
}