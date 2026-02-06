import { beforeEach, test, expect } from 'vitest';
import { instance, mock, verify, when } from 'ts-mockito';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { GamesResponse } from '../../../main/schema/GameSchema';
import { GameCode } from '../../../main/enum/GameCode';
import { GameType } from '../../../main/enum/GameType';
import { getMockResponse } from '../TestUtils';

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

test('games, invalid schema', async () => {
    const xmlContent = await getMockResponse('GamesCollectionInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_keys=${gameKey1}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.games().withGameKey(gameKey1).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with game_key', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_keys=${gameKey1}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().withGameKey(gameKey1).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with game_keys', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_keys=${gameKeys.join(',')}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().withGameKeys(gameKeys).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with game_code', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_codes=${gameCode1}`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().withGameCode(gameCode1).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with game_codes', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_codes=${gameCodes.join(',')}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().withGameCodes(gameCodes).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with game_type', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_types=${gameType1}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().withGameType(gameType1).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with game_types', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_types=${gameTypes.join(',')}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().withGameTypes(gameTypes).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with season', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;seasons=${season1}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().season(season1).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, with seasons', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;seasons=${seasons.join(',')}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().seasons(seasons).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, available', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;is_available=1`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client.games().available().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('games, many parameters', async () => {
    const xmlContent = await getMockResponse('GamesCollectionResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/games;game_keys=${gameKeys.join(',')};game_codes=${gameCodes.join(',')};game_types=${gameTypes.join(',')};seasons=2025;is_available=1`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GamesResponse = await client
        .games()
        .withGameKeys(gameKeys)
        .withGameCodes(gameCodes)
        .withGameTypes(gameTypes)
        .season("2025")
        .available()
        .get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});