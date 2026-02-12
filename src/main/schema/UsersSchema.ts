import { z } from 'zod';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';
import { GamesSchema } from './GameSchema';

const User = z.strictObject({
    guid: z.string()
});

const UserWithGamesSchema = z.strictObject({
    ...User.shape,
    games: GamesSchema
});

const UsersSchema = z.strictObject({
    count: z.string(),
    user: z.union([User, UserWithGamesSchema])
});

export const UsersResponseSchema = YahooFantasyContentBaseSchema.extend({
    users: UsersSchema
});

export type UsersResponse = z.infer<typeof UsersResponseSchema>;