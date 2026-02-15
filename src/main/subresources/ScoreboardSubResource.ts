import { ZodType } from 'zod';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { ExecutableResource } from '../ExecutableResource';

export class ScoreboardSubResource<T> extends ExecutableResource<T> {

    private _week: string | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): ScoreboardSubResource<U> {
        return new ScoreboardSubResource(schema, executor, pathBuilder);
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