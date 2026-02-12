import { beforeEach, test, expect } from 'vitest';
import { instance, mock, verify, when } from 'ts-mockito';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { getMockResponse } from '../TestUtils';
import { UsersGamesResponse, UsersTeamsResponse } from '../../../main/schema/UsersSchema';

let client: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();
    client = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
});

test('user games, invalid schema', async () => {
    const xmlContent = await getMockResponse('UsersGamesInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/users;use_login=1/games`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.users().games().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

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

    const response: UsersGamesResponse = await client.users().games().get();

    expect(response).not.toBeNull();
    expect(response.users.user).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('user teams', async () => {
    const xmlContent = await getMockResponse('UsersTeamsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/users;use_login=1/teams`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: UsersTeamsResponse = await client.users().teams().get();

    expect(response).not.toBeNull();
    expect(response.users.user).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('user teams', async () => {
    const xmlContent = await getMockResponse('UsersTeamsResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/users;use_login=1/teams;team_keys=foo`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: UsersTeamsResponse = await client.users().teams().teamKeys(['foo']).get();

    expect(response).not.toBeNull();
    expect(response.users.user).not.toBeNull();
    verify(mockedAxiosClient.get(endpoint)).once();
});

test('user teams, invalid schema', async () => {
    const xmlContent = await getMockResponse('UsersTeamsInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/users;use_login=1/teams`;
    
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(client.users().teams().get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});