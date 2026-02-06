import { beforeEach, expect, test } from 'vitest';
import { YahooFantasyClient } from '../../../main/YahooFantasyClient';
import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { instance, mock, verify, when } from 'ts-mockito';
import { TransactionResponse } from '../../../main/schema/TransactionSchema';
import { getMockResponse } from '../TestUtils';

const transactionKey = 'transactionKey1';

let yahooClient: YahooFantasyClient;
let mockedAxiosClient: AxiosInstance;

beforeEach(() => {
    mockedAxiosClient = mock<AxiosInstance>();

    yahooClient = new YahooFantasyClient("accessToken", instance(mockedAxiosClient));
})

test('transaction, invalid schema', async () => {
    const xmlContent = await getMockResponse('TransactionResourceInvalidResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/transaction/${transactionKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);
    await expect(yahooClient.transaction().withKey(transactionKey).get()).rejects.toThrowError('ZodError occurred');

    verify(mockedAxiosClient.get(endpoint)).once();
});

test('transaction', async () => {
    const xmlContent = await getMockResponse('TransactionResourceResponse.xml');
    const successfulResponse: AxiosResponse = {
        data: xmlContent,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
    }

    const endpoint = `/transaction/${transactionKey}`
    when(mockedAxiosClient.get(endpoint)).thenResolve(successfulResponse);

    const response: TransactionResponse = await yahooClient.transaction().withKey(transactionKey).get();

    expect(response).not.toBeNull();

    verify(mockedAxiosClient.get(endpoint)).once();
});
