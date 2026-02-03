import { GameResponse, GameResponseSchema } from "../schema/GameSchema";
import { RequestExecutor } from "../RequestExecutor";
import { GameCode } from "../enum/GameCode";
import { PermitGet } from "../PermitGet";
import { PathBuilder } from "../PathBuilder";

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
export class GameResourceBuilder implements PermitGameKey, PermitGet<GameResponse> {
    private readonly executor: RequestExecutor;
    private readonly pathBuilder: PathBuilder;

    private constructor(executor: RequestExecutor, pathBuilder: PathBuilder) {
        this.executor = executor;
        this.pathBuilder = pathBuilder;
    }

    static create(executor: RequestExecutor): PermitGameKey {
        return new GameResourceBuilder(executor, new PathBuilder('/game'));
    }

    withGameCode(gameCode: GameCode): PermitGet<GameResponse> {
        this.pathBuilder.withResource(gameCode);
        return this;
    }

    withGameId(gameId: string): PermitGet<GameResponse> {
        this.pathBuilder.withResource(gameId);
        return this;
    }

    async get(): Promise<GameResponse> {
        return await this.executor.makeGetRequest(this.pathBuilder.buildPath(), GameResponseSchema);
    }
}

export interface PermitGameKey {
    withGameCode(gameCode: GameCode): PermitGet<GameResponse>;
    withGameId(gameId: string): PermitGet<GameResponse>;
}