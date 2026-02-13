import { z } from 'zod';
import { ManagerSchema } from './ManagerSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';
import { PlayerSchema } from './PlayerSchema';

export const TeamSchema = z.strictObject({
    team_key: z.string(),
    team_id: z.string(),
    name: z.string(),
    is_owned_by_current_login: z.string().optional(),
    url: z.string(),
    team_logos: z.strictObject({
        team_logo: z.strictObject({
            size: z.string(),
            url: z.string()
        })
    }),
    previous_season_team_rank: z.string().optional(),
    waiver_priority: z.string(),
    number_of_moves: z.string(),
    number_of_trades: z.string(),
    roster_adds: z.strictObject({
        coverage_type: z.string(),
        coverage_value: z.string(),
        value: z.string()
    }),
    clinched_playoffs: z.string().optional(),
    league_scoring_type: z.string(),
    draft_position: z.string().optional(),
    has_draft_grade: z.string(),
    draft_grade: z.string().optional(),
    draft_recap_url: z.string().optional(),
    managers: z.strictObject({
        manager: z.union([ManagerSchema, z.array(ManagerSchema)])
    })
});

const TeamProjectedPointsSchema = z.strictObject({
    coverage_type: z.string(),
    week: z.string(),
    total: z.string()
});

export const TeamExtendedInfoSchema = z.strictObject({
    ...TeamSchema.shape,
    win_probability: z.string(),
    team_points: z.strictObject({
        coverage_type: z.string(),
        week: z.string(),
        total: z.string()
    }),
    team_projected_points: z.strictObject({
        coverage_type: z.string(),
        week: z.string(),
        total: z.string()
    })
});

const TeamStatsSchema = z.strictObject({
    ...TeamSchema.shape,
    team_points: z.strictObject({
        coverage_type: z.string(),
        season: z.string().optional(),
        week: z.string().optional(),
        total: z.string()
    }),
    team_projected_points: TeamProjectedPointsSchema.optional()
});

export const TeamRosterSchema = z.strictObject({
    ...TeamSchema.shape,
    roster: z.strictObject({
        coverage_type: z.string(),
        week: z.string(),
        is_prescoring: z.string(),
        is_editable: z.string(),
        players: z.strictObject({
            count: z.string(),
            player: z.array(PlayerSchema)
        })
    })
});

export const TeamRosterResponseSchema = YahooFantasyContentBaseSchema.extend({
    team: TeamRosterSchema
});

export type TeamRosterResponse = z.infer<typeof TeamRosterResponseSchema>;

export const TeamStatsResponseSchema = YahooFantasyContentBaseSchema.extend({
    team: TeamStatsSchema
});

export type TeamStatsResponse = z.infer<typeof TeamStatsResponseSchema>;

export const TeamResponseSchema = YahooFantasyContentBaseSchema.extend({
    team: TeamSchema
});

export type TeamResponse = z.infer<typeof TeamResponseSchema>;