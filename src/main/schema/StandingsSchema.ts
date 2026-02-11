import z from "zod";
import { TeamSchema } from "./TeamSchema";
import { LeagueSchema } from "./LeagueSchema";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

const TeamPointsSchema = z.object({
    coverage_type: z.string(),
    season: z.string(),
    total: z.string()
});

const TeamStandingsSchema = z.object({
    rank: z.string(),
    playoff_seed: z.string().optional(),
    outcome_totals: z.object({
        wins: z.string(),
        losses: z.string(),
        ties: z.string(),
        percentage: z.string()
    }),
    streak: z.object({
        type: z.string(),
        value: z.string()
    })
});

const TeamWithPointsAndStandingsSchema = z.strictObject({
    ...TeamSchema.shape,
    team_points: TeamPointsSchema,
    team_standings: TeamStandingsSchema
});

const StandingsSchema = z.strictObject({
    teams: z.object({
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