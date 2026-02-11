import { z } from 'zod';
import { LeagueSchema } from './LeagueSchema';
import { MatchupsSchema } from './MatchupsSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

export const ScoreboardSchema = z.strictObject({
    week: z.string(),
    matchups: MatchupsSchema
});

const LeagueScoreboardSchema = z.strictObject({
    ...LeagueSchema.shape,
    scoreboard: ScoreboardSchema
});

export const LeagueScoreboardResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeagueScoreboardSchema
});

export type LeagueScoreboardResponse = z.infer<typeof LeagueScoreboardResponseSchema>;