import { z } from 'zod';
import { LeagueSchema } from './LeagueSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

const DraftResultSchema = z.strictObject({
    pick: z.string(),
    round: z.string(),
    team_key: z.string(),
    player_key: z.string()
});

const DraftResultsSchema = z.strictObject({
    count: z.string(),
    draft_result: z.array(DraftResultSchema)
});

const LeagueDraftResultsSchema = z.strictObject({
    ...LeagueSchema.shape,
    draft_results: DraftResultsSchema
});

export const LeagueDraftResultsResponseSchema = YahooFantasyContentBaseSchema.extend({
  league: LeagueDraftResultsSchema
});

export type LeagueDraftResultsResponse = z.infer<typeof LeagueDraftResultsResponseSchema>;