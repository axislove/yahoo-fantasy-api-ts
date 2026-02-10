import axios, { AxiosInstance } from "axios";
import { GameResourceBuilder, PermitGameKey } from "./resource/GameResourceBuilder";
import { RequestExecutor } from "./RequestExecutor";
import { GamesCollectionBuilder } from "./collection/GamesCollectionBuilder";
import { PermitTeamKey, TeamResourceBuilder } from "./resource/TeamResourceBuilder";
import { PermitTransactionKey, TransactionResourceBuilder } from "./resource/TransactionResourceBuilder";
import { LeagueResourceBuilder } from "./resource/LeagueResourceBuilder";

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

    games(): GamesCollectionBuilder {
        return GamesCollectionBuilder.create(this.executor);
    }

    league(): LeagueResourceBuilder {
        return LeagueResourceBuilder.create(this.executor);
    }

    team(): PermitTeamKey {
        return TeamResourceBuilder.create(this.executor);
    }

    transaction(): PermitTransactionKey {
        return TransactionResourceBuilder.create(this.executor);
    }
}