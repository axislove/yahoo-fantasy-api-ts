import { beforeEach, expect, test } from 'vitest';
import { GameCode } from '../../../main/enum/GameCode';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';
import { getMockResponse } from '../TestUtils';
import { PlayerResponse } from '../../../main/schema/PlayerSchema';

let yahooClient: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance;

const playerKey = '461.p.30123';

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();

    yahooClient = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
})

test('player', async () => {
    const xmlContent = await getMockResponse('PlayerResourceResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/player/${playerKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: PlayerResponse = await yahooClient.player(playerKey).get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('player, invalid schema', async () => {
    const xmlContent = await getMockResponse('PlayerResourceInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/player/${playerKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(yahooClient.player(playerKey).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});