import { ZodType } from 'zod';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';
import { ExecutableResource } from '../ExecutableResource';

export class DraftResultsSubResource<T> extends ExecutableResource<T> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<U> {
        return new DraftResultsSubResource(schema, executor, pathBuilder);
    }
}
