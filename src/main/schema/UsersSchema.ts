import { z } from 'zod';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';
import { GamesSchema } from './GameSchema';
import { TeamRosterSchema, TeamSchema } from './TeamSchema';

const User = z.strictObject({
    guid: z.string()
});

const UserWithGamesSchema = z.strictObject({
    ...User.shape,
    games: GamesSchema
});

const UserWithTeamsSchema = z.strictObject({
    ...User.shape,
    teams: z.object({
        count: z.string(),
        team: z.array(TeamSchema)
    })
});

const UserTeamsRosterSchema = z.strictObject({
    ...User.shape,
    teams: z.object({
        count: z.string(),
        team: z.array(TeamRosterSchema)
    })
});

const UsersSchema = z.strictObject({
    count: z.string(),
    user: User
});

const UsersGamesSchema = z.strictObject({
    count: z.string(),
    user: UserWithGamesSchema
});

const UsersTeamsSchema = z.strictObject({
    count: z.string(),
    user: UserWithTeamsSchema
});

const UsersTeamsRosterSchema = z.strictObject({
    count: z.string(),
    user: UserTeamsRosterSchema
});

export const UsersResponseSchema = YahooFantasyContentBaseSchema.extend({
    users: UsersSchema
});

export const UsersGamesResponseSchema = YahooFantasyContentBaseSchema.extend({
    users: UsersGamesSchema
});

export const UsersTeamsResponseSchema = YahooFantasyContentBaseSchema.extend({
    users: UsersTeamsSchema
});

export const UsersTeamsRosterResponseSchema = YahooFantasyContentBaseSchema.extend({
    users: UsersTeamsRosterSchema
});

export type UsersResponse = z.infer<typeof UsersResponseSchema>;
export type UsersGamesResponse = z.infer<typeof UsersGamesResponseSchema>;
export type UsersTeamsResponse = z.infer<typeof UsersTeamsResponseSchema>;
export type UsersTeamsRosterResponse = z.infer<typeof UsersTeamsRosterResponseSchema>;