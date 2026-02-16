import { ZodType } from 'zod';
import { 
    LeaguesTeamsResponse,
    LeaguesTeamsResponseSchema,
    LeaguesTeamsRosterResponse,
    LeaguesTeamsRosterResponseSchema
} from '../schema/league/LeaguesSchema';
import { RequestExecutor } from '../RequestExecutor';
import { PathBuilder } from '../PathBuilder';
import { ExecutableResource } from '../ExecutableResource';
import { RosterSubResource } from '../subresources/RosterSubResource';

/**
 * https://developer.yahoo.com/fantasysports/guide/#teams-collection
 */
export class LeaguesTeamsCollection extends ExecutableResource<LeaguesTeamsResponse> {

    private readonly team_keys: string [] = [];

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new LeaguesTeamsCollection(LeaguesTeamsResponseSchema, executor, pathBuilder.withResource('teams'));
    }

    teamKeys(teamKeys: string[]): ExecutableResource<LeaguesTeamsResponse> {
        this.team_keys.push(...teamKeys);
        return this;
    }

    roster(): RosterSubResource<LeaguesTeamsRosterResponse> {
        return RosterSubResource.create(
            LeaguesTeamsRosterResponseSchema, this.executor, this.pathBuilder
        );
    }

    async get(): Promise<LeaguesTeamsResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        let pb = this.pathBuilder;
        if (this.team_keys.length > 0) {
            filterParams.set('team_keys', this.team_keys);
            pb = this.pathBuilder.withParams(filterParams)
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}