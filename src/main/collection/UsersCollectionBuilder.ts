import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { 
    UsersGamesResponse,
    UsersGamesResponseSchema,
    UsersResponse,
    UsersResponseSchema
} from '../schema/UsersSchema';
import { GamesCollectionBuilder } from './GamesCollectionBuilder';
import { UsersTeamsCollection } from './UsersTeamsCollection';

/**
 * https://developer.yahoo.com/fantasysports/guide/#user-resource
 * 
 * Yahoo recommends using Users collection instead of Users resource, and to provide
 * the use_login flag in the request. For this reason, User resource is unimplemented
 * and clients should use this UsersCollectionBuilder to make related requests.
 */
export class UsersCollectionBuilder extends ExecutableResource<UsersResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): UsersCollectionBuilder {
        return new UsersCollectionBuilder(UsersResponseSchema, executor, new PathBuilder('/users;use_login=1'));
    }

    games(): GamesCollectionBuilder<UsersGamesResponse> {
        return GamesCollectionBuilder.create<UsersGamesResponse>(
            UsersGamesResponseSchema, this.executor, this.pathBuilder.withResource('games')
        );
    }

    teams(): UsersTeamsCollection {
        return UsersTeamsCollection.create(this.executor, this.pathBuilder);
    }
}