import axios, { AxiosInstance, AxiosResponse } from "axios";
import { YahooFantasyClient } from "../YahooFantasyClient";
import { TokenResponse, TokenSchema } from "./schema/TokenSchema";

export class YahooAuthHelper {
    private readonly client_id: string;
    private readonly client_secret: string;
    private readonly refresh_token: string;
    private readonly client: AxiosInstance;

    constructor(client_id: string, client_secret: string, refresh_token: string, client?: AxiosInstance) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.refresh_token = refresh_token;

        if (client) {
            this.client = client;
        } else {
            this.client = axios.create({
                baseURL: "https://api.login.yahoo.com/oauth2",
                timeout: 5000
            });
        }
    }

    private async getToken(): Promise<TokenResponse> {
        const base64EncodedAuth = Buffer
            .from(this.client_id + ":" + this.client_secret)
            .toString("base64");

        const response: AxiosResponse = await this.client.post('/get_token', {
            client_id: this.client_id,
            client_secret: this.client_secret,
            refresh_token: this.refresh_token,
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

    // return YahooFantasyClient with new access token
    async authenticatedClient(): Promise<YahooFantasyClient> {
        const token: TokenResponse = await this.getToken();
        return new YahooFantasyClient(token.access_token);
    }
}
