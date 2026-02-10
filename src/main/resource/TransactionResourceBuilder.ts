import { ZodType } from "zod";
import { ExecutableResource } from "../ExecutableResource";
import { PathBuilder } from "../PathBuilder";
import { RequestExecutor } from "../RequestExecutor";
import { TransactionResponse, TransactionResponseSchema } from "../schema/TransactionSchema";

/**
 * https://developer.yahoo.com/fantasysports/guide/#transaction-resource
 */
export class TransactionResourceBuilder extends ExecutableResource<TransactionResponse> implements PermitTransactionKey {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(TransactionResponseSchema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): PermitTransactionKey {
        return new TransactionResourceBuilder(TransactionResponseSchema, executor, new PathBuilder('/transaction'));
    }

    withKey(transactionKey: string): ExecutableResource<TransactionResponse> {
        this.pathBuilder.withResource(transactionKey);
        return this;
    }
}

export interface PermitTransactionKey {
    withKey(transactionKey: string): ExecutableResource<TransactionResponse>;
}
