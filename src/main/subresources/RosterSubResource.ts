import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';

export class RosterSubResource<T> extends ExecutableResource<T> {

    private _week: string | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): RosterSubResource<U> {
        return new RosterSubResource(schema, executor, pathBuilder.withResource('roster'))
    }

    week(week: number): ExecutableResource<T> {
        this._week = week.toString();
        return this;
    }

    async get(): Promise<T> {
        let pb = this.pathBuilder;
        if (this._week) {
            pb = this.pathBuilder.withParam('week', this._week);
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}