import { GameType } from "../enum/GameType";
import { PathBuilder } from "../PathBuilder";
import { RequestExecutor } from "../RequestExecutor";
import { GameCode } from "../enum/GameCode";
import { GamesResponse, GamesResponseSchema } from "../schema/GameSchema";

export class GamesCollectionBuilder {

    // filters
    private readonly game_keys: string[] = [];
    private readonly game_codes: string[] = [];
    private readonly game_types: string[] = [];
    private readonly _seasons: string[] = [];
    private _available = false;
    
    private readonly executor: RequestExecutor;
    private readonly pathBuilder: PathBuilder;

    private constructor(executor: RequestExecutor, pathBuilder: PathBuilder) {
        this.executor = executor;
        this.pathBuilder = pathBuilder;
    }

    static create(executor: RequestExecutor): GamesCollectionBuilder {
        return new GamesCollectionBuilder(executor, new PathBuilder('/games'));
    }

    withGameKey(gameKey: string) {
        this.game_keys.push(gameKey);
        return this;
    }

    withGameKeys(gameKeys: string[]) {
        this.game_keys.push(...gameKeys);
        return this;
    }

    withGameCode(gameCode: GameCode) {
        this.game_codes.push(gameCode);
        return this;
    }

    withGameCodes(gameCodes: GameCode[]) {
        this.game_codes.push(...gameCodes);
        return this;
    }

    withGameType(gameType: GameType) {
        this.game_types.push(gameType);
        return this;
    }

    withGameTypes(gameTypes: GameType[]) {
        this.game_types.push(...gameTypes);
        return this;
    }

    season(season: string) {
        this._seasons.push(season);
        return this;
    }

    seasons(seasons: string[]) {
        this._seasons.push(...seasons);
        return this;
    }

    available() {
        this._available = true;
        return this;
    }

    async get(): Promise<GamesResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        if (this.game_keys.length > 0) {
            filterParams.set('game_keys', this.game_keys);
        }
        if (this.game_codes.length > 0) {
            filterParams.set('game_codes', this.game_codes);
        }
        if (this.game_types.length > 0) {
            filterParams.set('game_types', this.game_types);
        }
        if (this._seasons.length > 0) {
            filterParams.set('seasons', this._seasons);
        }
        if (this._available) {
            filterParams.set('is_available', ['1']);
        }

        this.pathBuilder.withParams(filterParams);
        return await this.executor.makeGetRequest(this.pathBuilder.buildPath(), GamesResponseSchema);
    }
}