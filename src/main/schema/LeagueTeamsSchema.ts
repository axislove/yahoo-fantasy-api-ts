import z from "zod";
import { LeagueSchema } from "./LeagueSchema";
import { TeamSchema } from "./TeamSchema";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

const TeamsSchema = z.strictObject({
    count: z.string(),
    team: z.array(TeamSchema)
});

const LeagueTeamsSchema = z.strictObject({
    ...LeagueSchema.shape,
    teams: TeamsSchema
});

export const LeagueTeamsResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeagueTeamsSchema
});

export type LeagueTeamsResponse = z.infer<typeof LeagueTeamsResponseSchema>;