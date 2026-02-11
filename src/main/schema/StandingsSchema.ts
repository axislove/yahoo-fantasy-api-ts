import { z } from 'zod';
import { TeamSchema } from './TeamSchema';
import { LeagueSchema } from './LeagueSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

const TeamPointsSchema = z.strictObject({
    coverage_type: z.string(),
    season: z.string(),
    total: z.string()
});

const TeamStandingsSchema = z.strictObject({
    rank: z.string(),
    playoff_seed: z.string().optional(),
    outcome_totals: z.strictObject({
        wins: z.string(),
        losses: z.string(),
        ties: z.string(),
        percentage: z.string()
    }),
    streak: z.strictObject({
        type: z.string(),
        value: z.string()
    }),
    points_for: z.string().optional(),
    points_against: z.string().optional()
});

const TeamWithPointsAndStandingsSchema = z.strictObject({
    ...TeamSchema.shape,
    team_points: TeamPointsSchema,
    team_standings: TeamStandingsSchema
});

const StandingsSchema = z.strictObject({
    teams: z.strictObject({
        count: z.string(),
        team: z.array(TeamWithPointsAndStandingsSchema)
    })
})

const LeagueStandingsSchema = LeagueSchema.extend({
    standings: StandingsSchema
});

export const LeagueStandingsResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeagueStandingsSchema
});

export type LeagueStandingsResponse = z.infer<typeof LeagueStandingsResponseSchema>;