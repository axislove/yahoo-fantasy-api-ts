import { z } from 'zod';
import { TeamSchema } from './TeamSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';
import { MatchupsSchema } from './MatchupsSchema';

export const TeamMatchupsSchema = z.strictObject({
    ...TeamSchema.shape,
    matchups: MatchupsSchema
});

export const TeamMatchupsResponseSchema = YahooFantasyContentBaseSchema.extend({
    team: TeamMatchupsSchema
})

export type TeamMatchupsResponse = z.infer<typeof TeamMatchupsResponseSchema>;