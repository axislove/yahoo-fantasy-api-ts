import { beforeEach, test, expect } from 'vitest';
import { instance, mock, verify, when } from 'ts-mockito';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { GamesResponse } from '../../../main/schema/GameSchema';
import { GameCode } from '../../../main/enum/GameCode';
import { GameType } from '../../../main/enum/GameType';
import { getMockResponse } from '../TestUtils';
import { UsersResponse } from '../../../main/schema/UsersSchema';

const gameKey1 = 'gameKey1';
const gameKey2 = 'gameKey2'
const gameKeys: string[] = [gameKey1, gameKey2];
const gameCode1 = GameCode.NFL;
const gameCode2 = GameCode.MLB;
const gameCodes: GameCode[] = [gameCode1, gameCode2];
const gameType1: GameType = GameType.FULL;
const gameType2: GameType = GameType.PICKEM_TEAM;
const gameTypes: GameType[] = [gameType1, gameType2];
const season1 = "2020";
const season2 = "2021";
const seasons: string[] = [season1, season2];

let client: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();
    client = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
});

// test('games, invalid schema', async () => {
//     const xmlContent = await getMockResponse('GamesCollectionInvalidResponse.xml');
//     const successfulResponse: AxiosResponse = {
//         data: xmlContent,
//         status: 200,
//         statusText: 'OK',
//         headers: {},
//         config: {} as InternalAxiosRequestConfig
//     }

//     const endpoint = `/games;game_keys=${gameKey1}`;
    
//     when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
//     await expect(client.games().withGameKey(gameKey1).get()).rejects.toThrowError('ZodError occurred');

//     verify(mockedAxiosClient.get(endpoint)).once();
// });

test('user games', async () => {
    const xmlContent = await getMockResponse('UsersGamesResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/users;use_login=1/games`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: UsersResponse = await client.users().games().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});