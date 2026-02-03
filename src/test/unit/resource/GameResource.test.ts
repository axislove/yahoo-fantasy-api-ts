import { beforeEach, expect, test } from 'vitest';
import { GameCode } from '../../../main/enum/GameCode';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { GameResponse } from '../../../main/schema/GameSchema';
import { UnitTestUtil } from '../UnitTestUtil';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';

let yahooClient: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance;

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();

    yahooClient = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
})

test('game with game_code', async () => {
    const xmlContent = await UnitTestUtil.getMockResponse('GameResourceResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const gameCode = GameCode.NFL;
    const endpoint = `/game/${gameCode}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GameResponse = await yahooClient.game().withGameCode(gameCode).get();
    
    expect(response).not.toBeNull();
    expect(response.game.code).toEqual(gameCode);

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('game with game_code, invalid schema', async () => {
    const xmlContent = await UnitTestUtil.getMockResponse('GameResourceInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const gameCode = GameCode.NFL;
    const endpoint = `/game/${gameCode}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(yahooClient.game().withGameCode(gameCode).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('game with game_id', async () => {
    const xmlContent = await UnitTestUtil.getMockResponse('GameResourceResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const gameId = '461';
    const endpoint = `/game/${gameId}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: GameResponse = await yahooClient.game().withGameId(gameId).get();
    
    expect(response).not.toBeNull();
    expect(response.game.game_id).toEqual(gameId);

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('game with game_id, invalid schema', async () => {
    const xmlContent = await UnitTestUtil.getMockResponse('GameResourceInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const gameId = '461';
    const endpoint = `/game/${gameId}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(yahooClient.game().withGameId(gameId).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});