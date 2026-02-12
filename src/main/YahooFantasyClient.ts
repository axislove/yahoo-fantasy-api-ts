import axios, { AxiosInstance } from 'axios';
import { GameResourceBuilder, PermitGameKey } from './resource/GameResourceBuilder';
import { RequestExecutor } from './RequestExecutor';
import { GamesCollectionBuilder } from './collection/GamesCollectionBuilder';
import { TeamResourceBuilder } from './resource/TeamResourceBuilder';
import { PermitTransactionKey, TransactionResourceBuilder } from './resource/TransactionResourceBuilder';
import { LeagueResourceBuilder } from './resource/LeagueResourceBuilder';
import { UsersCollectionBuilder } from './collection/UsersCollectionBuilder';
import { GamesResponse, GamesResponseSchema } from './schema/GameSchema';
import { PathBuilder } from './PathBuilder';

export class YahooFantasyClient {
    private static readonly BASE_URL: string = "https://fantasysports.yahooapis.com/fantasy/v2/";
    private static readonly TIMEOUT: number = 5000;

    private readonly executor: RequestExecutor;

    constructor(accessToken: string, client?: AxiosInstance) {
        if (client) {
            this.executor = new RequestExecutor(client);
        } else {
            this.executor = new RequestExecutor(
                axios.create({
                    baseURL: YahooFantasyClient.BASE_URL,
                    timeout: YahooFantasyClient.TIMEOUT,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            );
        }
    }

    game(): PermitGameKey {
        return GameResourceBuilder.create(this.executor);
    }

    games(): GamesCollectionBuilder<GamesResponse> {
        return new GamesCollectionBuilder<GamesResponse>(
            GamesResponseSchema, this.executor, new PathBuilder('/games')
        );
    }

    league(leagueKey: string): LeagueResourceBuilder {
        return LeagueResourceBuilder.create(leagueKey, this.executor);
    }

    team(teamKey: string): TeamResourceBuilder {
        return TeamResourceBuilder.create(teamKey, this.executor);
    }

    transaction(): PermitTransactionKey {
        return TransactionResourceBuilder.create(this.executor);
    }

    users() {
        return UsersCollectionBuilder.create(this.executor);
    }
}