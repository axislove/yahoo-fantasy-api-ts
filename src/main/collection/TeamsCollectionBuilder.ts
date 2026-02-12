import { ExecutableResource } from '../ExecutableResource';

export class TeamsCollectionBuilder<T> extends ExecutableResource<T> {

    private readonly team_keys: string [] = [];

    teamKeys(teamKeys: string[]): ExecutableResource<T> {
        this.team_keys.push(...teamKeys);
        return this;
    }

    async get(): Promise<T> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        let pb = this.pathBuilder;
        if (this.team_keys.length > 0) {
            filterParams.set('team_keys', this.team_keys);
            pb = this.pathBuilder.withParams(filterParams)
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}