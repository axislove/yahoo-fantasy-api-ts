import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { UsersTeamsResponse, UsersTeamsResponseSchema, UsersTeamsRosterResponse, UsersTeamsRosterResponseSchema } from '../schema/UsersSchema';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';
import { RosterSubResource } from '../subresources/RosterSubResource';

/**
 * https://developer.yahoo.com/fantasysports/guide/#teams-collection
 */
export class UsersTeamsCollection extends ExecutableResource<UsersTeamsResponse> {

    private readonly team_keys: string [] = [];

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new UsersTeamsCollection(UsersTeamsResponseSchema, executor, pathBuilder.withResource('teams'));
    }

    teamKeys(teamKeys: string[]): ExecutableResource<UsersTeamsResponse> {
        this.team_keys.push(...teamKeys);
        return this;
    }

    roster(): RosterSubResource<UsersTeamsRosterResponse> {
        return RosterSubResource.create<UsersTeamsRosterResponse>(
            UsersTeamsRosterResponseSchema, this.executor, this.pathBuilder
        );
    }

    async get(): Promise<UsersTeamsResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        let pb = this.pathBuilder;
        if (this.team_keys.length > 0) {
            filterParams.set('team_keys', this.team_keys);
            pb = this.pathBuilder.withParams(filterParams)
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}