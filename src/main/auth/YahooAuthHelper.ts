import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { YahooFantasyClient } from '../YahooFantasyClient';
import { TokenResponse, TokenSchema } from './schema/TokenSchema';

export class YahooAuthHelper {
    private static readonly BASE_URL: string = "https://api.login.yahoo.com/oauth2";
    private static readonly TOKEN_PATH: string = "/get_token";

    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly refreshToken: string;
    private readonly client: AxiosInstance;

    constructor(clientId: string, clientSecret: string, refreshToken: string, client?: AxiosInstance) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;

        if (client) {
            this.client = client;
        } else {
            this.client = axios.create({
                baseURL: YahooAuthHelper.BASE_URL,
                timeout: 5000
            });
        }
    }

    // return YahooFantasyClient with new access token
    async authenticatedClient(): Promise<YahooFantasyClient> {
        const token: TokenResponse = await this.getToken();
        return new YahooFantasyClient(token.access_token);
    }

    private async getToken(): Promise<TokenResponse> {
        const base64EncodedAuth = Buffer
            .from(this.clientId + ":" + this.clientSecret)
            .toString("base64");

        const response: AxiosResponse = await this.client.post(YahooAuthHelper.TOKEN_PATH, {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: this.refreshToken,
            redirect_uri: "oob",
            grant_type: "refresh_token"
        }, {
            headers: {
                Authorization: `Basic ${base64EncodedAuth}`,
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });

        if (response.status !== 200 || response.data.error) {
            throw new Error(`Token request failed: ${response.data.error_description || response.statusText}`)
        }

        return TokenSchema.parse(response.data);
    }
}
