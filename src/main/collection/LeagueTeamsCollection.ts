import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { LeagueTeamsResponse, LeagueTeamsResponseSchema, LeagueTeamsRosterResponse, LeagueTeamsRosterResponseSchema } from '../schema/league/LeagueTeamsSchema';
import { RosterSubResource } from '../subresources/RosterSubResource';

/**
 * https://developer.yahoo.com/fantasysports/guide/#teams-collection
 */
export class LeagueTeamsCollection extends ExecutableResource<LeagueTeamsResponse> {

    private readonly team_keys: string [] = [];

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new LeagueTeamsCollection(LeagueTeamsResponseSchema, executor, pathBuilder.withResource('teams'));
    }

    teamKeys(teamKeys: string[]): ExecutableResource<LeagueTeamsResponse> {
        this.team_keys.push(...teamKeys);
        return this;
    }

    roster(): RosterSubResource<LeagueTeamsRosterResponse> {
        return RosterSubResource.create<LeagueTeamsRosterResponse>(
            LeagueTeamsRosterResponseSchema, this.executor, this.pathBuilder
        );
    }

    async get(): Promise<LeagueTeamsResponse> {
        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        let pb = this.pathBuilder;
        if (this.team_keys.length > 0) {
            filterParams.set('team_keys', this.team_keys);
            pb = this.pathBuilder.withParams(filterParams)
        }

        return await this.executor.makeGetRequest(pb.buildPath(), this.schema);
    }
}