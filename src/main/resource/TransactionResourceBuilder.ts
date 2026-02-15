import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { TransactionResponse, TransactionResponseSchema } from '../schema/TransactionSchema';

/**
 * https://developer.yahoo.com/fantasysports/guide/#transaction-resource
 */
export class TransactionResourceBuilder extends ExecutableResource<TransactionResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(transactionKey: string, executor: RequestExecutor): ExecutableResource<TransactionResponse> {
        return new TransactionResourceBuilder(
            TransactionResponseSchema, executor, new PathBuilder('/transaction').withResource(transactionKey)
        );
    }
}
