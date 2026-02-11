import { test, expect } from 'vitest';
import { YahooFantasyClient } from '../../main/YahooFantasyClient';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';
import { getMockResponse } from './TestUtils';

test('YahooFantasyClient, only token', () => {
    const client: YahooFantasyClient = new YahooFantasyClient("accessToken");
    expect(client).not.toBeNull();
});

test('YahooFantasyClient, token and client', () => {
    const httpClient: AxiosInstance = axios.create({
        baseURL: "url",
        timeout: 1000,
        headers: {
            Authorization: `Bearer foo`
        }
    });

    const client: YahooFantasyClient = new YahooFantasyClient("accessToken", httpClient);
    expect(client).not.toBeNull();
});

/**
 * Tests that YahooFantasyClient can make successive requests to different endpoints.
 * If our path building is working correctly, we should see this succeed, as the path
 * is different in these API calls, and nothing additional should be appended to the
 * paths.
 */
test('multiple subresource calls dont corrupt paths', async () => {
    const mockedAxiosClient: AxiosInstance = mock<AxiosInstance>();
    const client: YahooFantasyClient = new YahooFantasyClient('accessToken', instance(mockedAxiosClient));
    expect(client).not.toBeNull();

    const leagueTeamsXml = await getMockResponse('LeagueTeamsResponse.xml');
    const leagueTeamsResponse: AxiosResponse = {
        data: leagueTeamsXml,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const leagueStandingsXml = await getMockResponse('LeagueStandingsResponse.xml');
    const leagueStandingsResponse: AxiosResponse = {
        data: leagueStandingsXml,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const leagueKey = "league_key";
    const league = client.league(leagueKey);
    
    when(mockedAxiosClient.get(`/league/${leagueKey}/teams`)).thenResolve(leagueTeamsResponse);
    when(mockedAxiosClient.get(`/league/${leagueKey}/standings`)).thenResolve(leagueStandingsResponse);
    
    await league.teams().get();
    await league.standings().get();
    
    verify(mockedAxiosClient.get(`/league/${leagueKey}/teams`)).once();
    verify(mockedAxiosClient.get(`/league/${leagueKey}/standings`)).once();
});