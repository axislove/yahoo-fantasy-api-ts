import { beforeEach, test, expect } from 'vitest';
import { instance, mock, verify, when } from 'ts-mockito';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { getMockResponse } from '../TestUtils';
import { LeaguesDraftResultsResponse, LeaguesResponse, LeaguesScoreboardResponse, LeaguesSettingsResponse, LeaguesStandingsResponse, LeaguesTeamsResponse, LeaguesTransactionsResponse } from '../../../main/schema/league/LeaguesSchema';
import { TransactionType } from '../../../main/enum/TransactionType';

let client: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance;

const leagueKeys: string[] = ['leagueKey1', 'leagueKey2'];

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();
    client = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
});

test('leagues, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues', async () => {
    const xmlContent = await getMockResponse('LeaguesResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesResponse = await client.leagues(leagueKeys).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues draft results, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesDraftResultsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/draftresults`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).draftResults().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues draft results', async () => {
    const xmlContent = await getMockResponse('LeaguesDraftResultsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/draftresults`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesDraftResultsResponse = await client.leagues(leagueKeys).draftResults().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues scoreboards, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesScoreboardInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/scoreboard`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).scoreboard().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues scoreboards', async () => {
    const xmlContent = await getMockResponse('LeaguesScoreboardResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/scoreboard`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesScoreboardResponse = await client.leagues(leagueKeys).scoreboard().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues scoreboards, week filter', async () => {
    const xmlContent = await getMockResponse('LeaguesScoreboardResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/scoreboard;week=3`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesScoreboardResponse = await client.leagues(leagueKeys).scoreboard().week(3).get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues settings, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesSettingsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/settings`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).settings().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues settings', async () => {
    const xmlContent = await getMockResponse('LeaguesSettingsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/settings`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesSettingsResponse = await client.leagues(leagueKeys).settings().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues standings, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesStandingsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/standings`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).standings().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues standings', async () => {
    const xmlContent = await getMockResponse('LeaguesStandingsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/standings`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesStandingsResponse = await client.leagues(leagueKeys).standings().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues teams, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesTeamsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/teams`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).teams().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues teams results', async () => {
    const xmlContent = await getMockResponse('LeaguesTeamsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/teams`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesTeamsResponse = await client.leagues(leagueKeys).teams().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues transactions, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguesTransactionsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/transactions`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.leagues(leagueKeys).transactions().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues transactions', async () => {
    const xmlContent = await getMockResponse('LeaguesTransactionsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/transactions`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesTransactionsResponse = await client.leagues(leagueKeys).transactions().get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('leagues transactions, filters', async () => {
    const xmlContent = await getMockResponse('LeaguesTransactionsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/leagues;league_keys=${leagueKeys.join(',')}/transactions;types=add,drop`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguesTransactionsResponse = await client
        .leagues(leagueKeys)
        .transactions()
        .withType(TransactionType.ADD)
        .withType(TransactionType.DROP)
        .get();

    expect(response).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});