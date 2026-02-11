import { z } from "zod";
import { LeagueResponseSchema, LeagueSchema } from "./LeagueSchema";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

const LeaguesSchema = z.strictObject({
    count: z.string(),
    league: z.union([LeagueSchema, z.array(LeagueSchema)])
});

export const LeaguesResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: LeaguesSchema
});

export type LeaguesResponse = z.infer<typeof LeagueResponseSchema>;