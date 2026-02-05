import { beforeEach, expect, test } from 'vitest';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';
import { TeamResponse, TeamStatsResponse } from '../../../main/schema/TeamSchema';
import { getMockResponse } from '../UnitTestUtil';

const teamKey = 'teamKey1';

let yahooClient: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance;

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();

    yahooClient = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
})

test('team', async () => {
    const xmlContent = await getMockResponse('TeamResourceResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamResponse = await yahooClient.team().teamKey(teamKey).get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team, invalid schema', async () => {
    const xmlContent = await getMockResponse('TeamResourceInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    
    await expect(yahooClient.team().teamKey(teamKey).get()).rejects.toThrowError('ZodError occurred')

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team matchups', async () => {
    const xmlContent = await getMockResponse('TeamMatchupsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/matchups`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamResponse = await yahooClient.team().teamKey(teamKey).matchups().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team stats', async () => {
    const xmlContent = await getMockResponse('TeamStatsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/stats`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamStatsResponse = await yahooClient.team().teamKey(teamKey).stats().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});