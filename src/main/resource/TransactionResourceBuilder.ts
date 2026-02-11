import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { TransactionResponse, TransactionResponseSchema } from '../schema/TransactionSchema';

/**
 * https://developer.yahoo.com/fantasysports/guide/#transaction-resource
 */
export class TransactionResourceBuilder extends ExecutableResource<TransactionResponse> implements PermitTransactionKey {

    private transactionKey: string | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(TransactionResponseSchema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): PermitTransactionKey {
        return new TransactionResourceBuilder(TransactionResponseSchema, executor, new PathBuilder('/transaction'));
    }

    withKey(transactionKey: string): ExecutableResource<TransactionResponse> {
        this.transactionKey = transactionKey;
        return this;
    }

    async get(): Promise<TransactionResponse> {
        let pb = this.pathBuilder;
        if (this.transactionKey) {
            pb = pb.withResource(this.transactionKey);
        }
    
        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}

export interface PermitTransactionKey {
    withKey(transactionKey: string): ExecutableResource<TransactionResponse>;
}
