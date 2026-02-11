import { ZodType } from 'zod';
import { PathBuilder } from './PathBuilder';
import { RequestExecutor } from './RequestExecutor';

export abstract class ExecutableResource<R> {
    protected readonly schema: ZodType;
    protected readonly executor: RequestExecutor;
    protected readonly pathBuilder: PathBuilder;

    constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        this.schema = schema;
        this.executor = executor;
        this.pathBuilder = pathBuilder;
    }

    async get(): Promise<R> {
        return await this.executor.makeGetRequest(this.pathBuilder.buildPath(), this.schema);
    }
}