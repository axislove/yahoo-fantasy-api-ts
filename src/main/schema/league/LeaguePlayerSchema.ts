import z from 'zod';
import { PlayerSchema, PlayerStatsSchema } from '../PlayerSchema';
import { YahooFantasyContentBaseSchema } from '../FantasyContentSchema';
import { LeagueSchema } from './LeagueSchema';

const LeaguePlayerSchema = z.strictObject({
    ...LeagueSchema.shape,
    players: z.object({
        count: z.string(),
        player: PlayerSchema
    })
});

const LeaguePlayerStatsSchema = z.strictObject({
    ...LeagueSchema.shape,
    players: z.object({
        count: z.string(),
        player: PlayerStatsSchema
    })
});

export const LeaguePlayerResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeaguePlayerSchema
});
export type LeaguePlayerResponse = z.infer<typeof LeaguePlayerResponseSchema>;

export const LeaguePlayerStatsResponseSchema  = YahooFantasyContentBaseSchema.extend({
    league: LeaguePlayerStatsSchema
});
export type LeaguePlayerStatsResponse = z.infer<typeof LeaguePlayerStatsResponseSchema>