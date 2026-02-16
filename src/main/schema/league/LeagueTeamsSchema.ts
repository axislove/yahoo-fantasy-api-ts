import { z } from 'zod';
import { LeagueSchema } from './LeagueSchema';
import { TeamRosterSchema, TeamSchema } from '../TeamSchema';
import { YahooFantasyContentBaseSchema } from '../FantasyContentSchema';

const TeamsSchema = z.strictObject({
    count: z.string(),
    team: z.array(TeamSchema)
});

const TeamsRostersSchema = z.strictObject({
    count: z.string(),
    team: z.array(TeamRosterSchema)
});

export const LeagueTeamsSchema = z.strictObject({
    ...LeagueSchema.shape,
    teams: TeamsSchema
});

export const LeagueTeamsRosterSchema = z.strictObject({
    ...LeagueSchema.shape,
    teams: TeamsRostersSchema
});

export const LeagueTeamsResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeagueTeamsSchema
});
export type LeagueTeamsResponse = z.infer<typeof LeagueTeamsResponseSchema>;

export const LeagueTeamsRosterResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeagueTeamsRosterSchema
});
export type LeagueTeamsRosterResponse = z.infer<typeof LeagueTeamsRosterSchema>;