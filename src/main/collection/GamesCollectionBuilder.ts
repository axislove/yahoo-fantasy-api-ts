import { GameType } from '../enum/GameType';
import { GameCode } from '../enum/GameCode';
import { ExecutableResource } from '../ExecutableResource';
import { ZodType } from 'zod';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';

/**
 * https://developer.yahoo.com/fantasysports/guide/#games-collection
 */
export class GamesCollectionBuilder<T> extends ExecutableResource<T> {

    // filters
    private readonly game_keys: string[] = [];
    private readonly game_codes: string[] = [];
    private readonly game_types: string[] = [];
    private readonly _seasons: string[] = [];
    private _available = false;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): GamesCollectionBuilder<U> {
        return new GamesCollectionBuilder(schema, executor, pathBuilder);
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

    async get(): Promise<T> {
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

        return await this.executor.makeGetRequest(this.pathBuilder.withParams(filterParams).buildPath(), this.schema);
    }
}