import { ZodType } from 'zod';
import { ExecutableResource } from '../ExecutableResource';
import { PathBuilder } from '../PathBuilder';
import { RequestExecutor } from '../RequestExecutor';
import { UsersResponse, UsersResponseSchema } from '../schema/UsersSchema';
import { GamesResponseSchema } from '../schema/GameSchema';
import { GamesCollectionBuilder } from './GamesCollectionBuilder';

/**
 * https://developer.yahoo.com/fantasysports/guide/#user-resource
 * 
 * Yahoo recommends using Users collection instead of Users resource, and to provide
 * the use_login flag in the request. For this reason, Users resource is unimplemented
 * and clients should use this UsersCollectionBuilder to make related requests.
 */
export class UsersCollectionBuilder extends ExecutableResource<UsersResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor): UsersCollectionBuilder {
        return new UsersCollectionBuilder(UsersResponseSchema, executor, new PathBuilder('/users;use_login=1'));
    }

    games(): GamesCollectionBuilder<UsersResponse> {
        return new GamesCollectionBuilder<UsersResponse>(
            GamesResponseSchema, this.executor, this.pathBuilder.withResource('games')
        );
    }

}