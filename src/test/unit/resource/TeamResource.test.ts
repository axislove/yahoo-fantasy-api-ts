import { beforeEach, expect, test } from 'vitest';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';
import { TeamResponse, TeamRosterResponse, TeamStatsResponse } from '../../../main/schema/TeamSchema';
import { getMockResponse } from '../TestUtils';

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

    const response: TeamResponse = await yahooClient.team(teamKey).get();
    
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
    
    await expect(yahooClient.team(teamKey).get()).rejects.toThrowError('ZodError occurred')

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

    const response: TeamResponse = await yahooClient.team(teamKey).matchups().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team matchups with weeks', async () => {
    const xmlContent = await getMockResponse('TeamMatchupsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/matchups;weeks=1,4`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamResponse = await yahooClient.team(teamKey).matchups().weeks([1, 4]).get();
    
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

    const response: TeamStatsResponse = await yahooClient.team(teamKey).stats().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team stats - season', async () => {
    const xmlContent = await getMockResponse('TeamStatsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/stats;type=season`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamStatsResponse = await yahooClient.team(teamKey).stats().season().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team stats - week', async () => {
    const xmlContent = await getMockResponse('TeamStatsWeekResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/stats;type=week;week=10`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamStatsResponse = await yahooClient.team(teamKey).stats().week(10).get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team roster', async () => {
    const xmlContent = await getMockResponse('TeamRosterResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/roster`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamRosterResponse = await yahooClient.team(teamKey).roster().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('team roster, week filter', async () => {
    const xmlContent = await getMockResponse('TeamRosterResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/team/${teamKey}/roster;week=10`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TeamRosterResponse = await yahooClient.team(teamKey).roster().week(10).get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});