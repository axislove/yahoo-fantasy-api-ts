import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';

export class SettingsSubResource<T> extends ExecutableResource<T> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ExecutableResource<U> {
        return new SettingsSubResource(schema, executor, pathBuilder);
    }
}