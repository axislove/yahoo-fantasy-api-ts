import { test, expect } from 'vitest';
import { YahooFantasyClient } from '../../main/YahooFantasyClient';
import axios, { AxiosInstance } from 'axios';

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
})