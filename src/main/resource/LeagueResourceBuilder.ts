import { ZodType } from "zod";
import { PathBuilder } from "../PathBuilder";
import { RequestExecutor } from "../RequestExecutor";
import { ExecutableResource } from "../ExecutableResource";
import { LeagueResponse, LeagueResponseSchema } from "../schema/LeagueSchema";
import { LeagueTransactionsResponse, LeagueTransactionsResponseSchema } from "../schema/TransactionsSchema";

export class LeagueResourceBuilder extends ExecutableResource<LeagueResponse> implements PermitLeagueKey, PermitTransactions {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): PermitLeagueKey {
        return new LeagueResourceBuilder(LeagueResponseSchema, executor, new PathBuilder(`league`));
    }

    withLeagueKey(leagueKey: string): PermitTransactions {
        this.pathBuilder.withResource(leagueKey);
        return this;
    }

    transactions(): ExecutableResource<LeagueTransactionsResponse> {
        return TransactionsSubResource.create(this.executor, this.pathBuilder);
    }

}

class TransactionsSubResource extends ExecutableResource<LeagueTransactionsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new TransactionsSubResource(LeagueTransactionsResponseSchema, executor, new PathBuilder('transactions'));
    }
}

interface PermitTransactions {
    transactions(): void;
}

export interface PermitLeagueKey {
    withLeagueKey(leagueKey: string): void;
}