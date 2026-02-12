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
import { TransactionType } from '../../../main/enum/TransactionType';
import { LeaguePlayersResponse } from '../../../main/schema/LeaguePlayersSchema';
import { PlayerStatus } from '../../../main/enum/PlayerStatus';
import { PlayerSort } from '../../../main/enum/PlayerSort';
import { PlayerSortType } from '../../../main/enum/PlayerSortType';
import { PlayerPosition } from '../../../main/enum/PlayerPosition';

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

test('league teams, invalid schema', async () => {
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

    const endpoint = `/league/${leagueKey}/transactions;type=add;team_key=teamKey;count=3`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeagueTransactionsResponse = await yahooClient
        .league(leagueKey)
        .transactions()
        .withTeamKey('teamKey')
        .withType(TransactionType.ADD)
        .count(3)
        .get();
    
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

test('league players', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient.league(leagueKey).players().get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, invalid schema', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    await expect(yahooClient.league(leagueKey).players().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, position filter', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;position=QB`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .position(PlayerPosition.QB)
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, status filter', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;status=A`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .status(PlayerStatus.AVAILABLE)
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, search filter', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;search=Mahomes`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .search('Mahomes')
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, sort filter', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;sort=AR`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .sort(PlayerSort.ACTUAL_RANK)
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, sort type filter', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;sort_type=season`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .sortType(PlayerSortType.SEASON)
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, pagination filters', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;start=25;count=25`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .start(25)
        .count(25)
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, player keys filter', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;player_keys=461.p.6763,461.p.7200`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .playerKeys(['461.p.6763', '461.p.7200'])
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('league players, multiple filters', async () => {
    const xmlContent = await getMockResponse('LeaguePlayersResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/league/${leagueKey}/players;position=QB;status=A;sort=AR;sort_type=season;start=0;count=25`;
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: LeaguePlayersResponse = await yahooClient
        .league(leagueKey)
        .players()
        .position(PlayerPosition.QB)
        .status(PlayerStatus.AVAILABLE)
        .sort(PlayerSort.ACTUAL_RANK)
        .sortType(PlayerSortType.SEASON)
        .start(0)
        .count(25)
        .get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});
