import { ZodType } from 'zod';
import { TransactionType } from '../enum/TransactionType';
import { ExecutableResource } from '../ExecutableResource';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';

// TODO: figure out how to restrict functions, for now just allow user to reach all functions
export class TransactionsSubResource<T> extends ExecutableResource<T> {

    private types: TransactionType[] = [];
    private team_key: string | undefined = undefined;
    private _count: number | undefined = undefined;

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create<U>(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder): TransactionsSubResource<U>  {
        return new TransactionsSubResource(schema, executor, pathBuilder);
    }

    withType(type: TransactionType): this {
        this.types.push(type);
        return this;
    }

    withTypes(types: TransactionType[]): this {
        this.types = types;
        return this;
    }

    withTeamKey(teamKey: string): this {
        this.team_key = teamKey;
        return this;
    }

    count(count: number): this {
        this._count = count;
        return this;
    }

    async get(): Promise<T> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();
        
        if (this.types.length > 0) {
            filterParams.set('types', this.types);
        }
        if (this.team_key) {
            filterParams.set('team_key', [this.team_key]);
        }
        if (this._count) {
            filterParams.set('count', [this._count.toString()])
        }

        return this.executor.makeGetRequest(this.pathBuilder.withParams(filterParams).buildPath(), this.schema);
    }
}