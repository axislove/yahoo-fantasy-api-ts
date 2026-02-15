import { z } from 'zod';
import { LeagueResponseSchema, LeagueSchema } from './LeagueSchema';
import { YahooFantasyContentBaseSchema } from '../FantasyContentSchema';
import { LeagueDraftResultsSchema } from '../DraftResultsSchema';
import { LeagueTeamsSchema } from './LeagueTeamsSchema';
import { LeagueScoreboardSchema } from '../ScoreboardSchema';
import { LeagueSettingsSchema } from '../SettingsSchema';
import { LeagueStandingsResponseSchema, LeagueStandingsSchema } from '../StandingsSchema';
import { LeagueTransactionsSchema } from '../TransactionsSchema';

const LeaguesSchema = z.strictObject({
    count: z.string(),
    league: z.union([LeagueSchema, z.array(LeagueSchema)])
});

export const LeaguesResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: LeaguesSchema
});
export type LeaguesResponse = z.infer<typeof LeagueResponseSchema>;

export const LeaguesDraftResultsSchema = YahooFantasyContentBaseSchema.extend({
    leagues: z.object({
        count: z.string(),
        league: z.array(LeagueDraftResultsSchema)
    })
});
export type LeaguesDraftResultsResponse = z.infer<typeof LeaguesDraftResultsSchema>;

export const LeaguesTeamsResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: z.object({
        count: z.string(),
        league: z.array(LeagueTeamsSchema)
    })
});
export type LeaguesTeamsResponse = z.infer<typeof LeaguesTeamsResponseSchema>;

export const LeaguesScoreboardResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: z.object({
        count: z.string(),
        league: z.array(LeagueScoreboardSchema)
    })
});
export type LeaguesScoreboardResponse = z.infer<typeof LeaguesScoreboardResponseSchema>;

export const LeaguesSettingsResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: z.object({
        count: z.string(),
        league: z.array(LeagueSettingsSchema)
    })
});
export type LeaguesSettingsResponse = z.infer<typeof LeaguesSettingsResponseSchema>;

export const LeaguesStandingsResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: z.object({
        count: z.string(),
        league: z.array(LeagueStandingsSchema)
    })
});
export type LeaguesStandingsResponse = z.infer<typeof LeagueStandingsResponseSchema>;

export const LeaguesTransactionsResponseSchema = YahooFantasyContentBaseSchema.extend({
    leagues: z.object({
        count: z.string(),
        league: z.array(LeagueTransactionsSchema)
    })
});
export type LeaguesTransactionsResponse = z.infer<typeof LeaguesTransactionsResponseSchema>;