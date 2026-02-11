import { beforeEach, expect, test } from 'vitest';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';
import { getMockResponse } from '../TestUtils';
import { LeagueStandingsResponse } from '../../../main/schema/StandingsSchema';
import { LeagueScoreboardResponse } from '../../../main/schema/ScoreboardSchema';
import { LeagueDraftResultsResponse } from '../../../main/schema/DraftResultsSchema';
import { LeagueSettingsResponse } from '../../../main/schema/SettingsSchema';
import { LeagueTransactionsResponse } from '../../../main/schema/TransactionsSchema';
import { LeagueResponse } from '../../../main/schema/LeagueSchema';
import { LeagueTeamsResponse } from '../../../main/schema/LeagueTeamsSchema';

let yahooClient: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance;
const leagueKey = '000.l.000000';

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();

    yahooClient = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
})

test('league', async () => {
    const xmlContent = await getMockResponse('LeagueResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueResponse = await yahooClient.league(leagueKey).get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeagueInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league draftresults', async () => {
    const xmlContent = await getMockResponse('LeagueDraftResultsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/draftresults`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueDraftResultsResponse = await yahooClient.league(leagueKey).draftResults().get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league draftresults, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeagueDraftResultsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/draftresults`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).draftResults().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league teams', async () => {
    const xmlContent = await getMockResponse('LeagueTeamsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/teams`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueTeamsResponse = await yahooClient.league(leagueKey).teams().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league settings, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeagueTeamsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/teams`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).teams().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league transactions', async () => {
    const xmlContent = await getMockResponse('LeagueTransactionsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/transactions`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueTransactionsResponse = await yahooClient.league(leagueKey).transactions().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league transactions, multiple filters', async () => {
    const xmlContent = await getMockResponse('LeagueTransactionsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/transactions`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueTransactionsResponse = await yahooClient.league(leagueKey).transactions().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league settings', async () => {
    const xmlContent = await getMockResponse('LeagueSettingsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/settings`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueSettingsResponse = await yahooClient.league(leagueKey).settings().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league settings, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeagueSettingsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/settings`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).settings().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league standings', async () => {
    const xmlContent = await getMockResponse('LeagueStandingsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/standings`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueStandingsResponse = await yahooClient.league(leagueKey).standings().get();
    
    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league standings, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeagueStandingsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/standings`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).standings().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league scoreboard', async () => {
    const xmlContent = await getMockResponse('LeagueScoreboardResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/scoreboard`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueScoreboardResponse = await yahooClient.league(leagueKey).scoreboard().get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league scoreboard, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeagueScoreboardInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/scoreboard`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).scoreboard().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league scoreboard, week filter', async () => {
    const xmlContent = await getMockResponse('LeagueScoreboardResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/scoreboard;week=10`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueScoreboardResponse = await yahooClient.league(leagueKey).scoreboard().week(10).get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});
