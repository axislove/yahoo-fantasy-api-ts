import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';

export class StandingsSubResource<T> extends ExecutableResource<T> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<U> {
        return new StandingsSubResource(schema, executor, pathBuilder);
    }
}