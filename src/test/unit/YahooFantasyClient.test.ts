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
 * is different in these API calls.
 */
test('YahooFantasyClient, multiple resources', async () => {
    const mockedAxiosClient: AxiosInstance = mock<AxiosInstance>();
    const client: YahooFantasyClient = new YahooFantasyClient('accessToken', instance(mockedAxiosClient));
    expect(client).not.toBeNull();

    const xmlContent = await getMockResponse('GameResourceResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    when(mockedAxiosClient.get('/game/123')).thenResolve(successfulResponse);
    await client.game().withGameId('123').get();
    verify(mockedAxiosClient.get('/game/123')).once();

    when(mockedAxiosClient.get('/game/456')).thenResolve(successfulResponse);
    await client.game().withGameId('456').get();
    verify(mockedAxiosClient.get('/game/456')).once();
});