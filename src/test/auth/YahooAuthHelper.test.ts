import { beforeEach, expect, test } from 'vitest';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { anything, capture, instance, mock, verify, when } from 'ts-mockito';
import { YahooAuthHelper } from '../../main/auth/YahooAuthHelper';
import { YahooFantasyClient } from '../../main/YahooFantasyClient';

let authHelper: YahooAuthHelper;
let mockAxiosClient: AxiosInstance;

const clientId = "client_id";
const clientSecret = "client_secret";
const refreshToken = "refresh_token"

beforeEach(() => {
    mockAxiosClient = mock<AxiosInstance>();

    authHelper = new YahooAuthHelper(clientId, clientSecret, refreshToken, instance(mockAxiosClient));
});

test('initialize YahooAuthHelper - no axios client', () => {
    const yahooAuthHelper = new YahooAuthHelper(clientId, clientSecret, refreshToken);

    expect(yahooAuthHelper).not.toBeNull();
});

test('authenticated client - axios error', async () => {
    const encodedAuth = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    const expectedRequestData = {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        redirect_uri: "oob",
        grant_type: "refresh_token"
    }
    const expectedHeaders = {
        headers: {
            Authorization: `Basic ${encodedAuth}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }

    const mockedErrorResponse: AxiosResponse = {
        data: {
            error: "Something went wrong"
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    when(mockAxiosClient.post('/get_token', anything(), anything() as AxiosRequestConfig))
        .thenResolve(mockedErrorResponse);

    await expect(authHelper.authenticatedClient()).rejects.toThrow('Token request failed: Bad Request');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const [firstArg, secondArg, thirdArg] = capture(mockAxiosClient.post).last();
    expect(firstArg).eqls('/get_token');
    expect(secondArg).eqls(expectedRequestData);
    expect(thirdArg).eqls(expectedHeaders);

    verify(mockAxiosClient.post('/get_token', anything(), anything() as AxiosRequestConfig)).once();
});


test('authenticated client', async () => {
    const encodedAuth = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    const expectedRequestData = {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        redirect_uri: "oob",
        grant_type: "refresh_token"
    }
    const expectedHeaders = {
        headers: {
            Authorization: `Basic ${encodedAuth}`,
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }

    const mockedTokenData = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expires_in: 1234567890,
        token_type: 'bearer'
    }

    const mockedTokenResponse: AxiosResponse = {
        data: mockedTokenData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    when(mockAxiosClient.post('/get_token', anything(), anything() as AxiosRequestConfig))
        .thenResolve(mockedTokenResponse);

    const yahooClient: YahooFantasyClient = await authHelper.authenticatedClient();
    expect(yahooClient).toBeInstanceOf(YahooFantasyClient);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const [firstArg, secondArg, thirdArg] = capture(mockAxiosClient.post).last();
    expect(firstArg).eqls('/get_token');
    expect(secondArg).eqls(expectedRequestData);
    expect(thirdArg).eqls(expectedHeaders);

    verify(mockAxiosClient.post('/get_token', anything(), anything() as AxiosRequestConfig)).once();
});
