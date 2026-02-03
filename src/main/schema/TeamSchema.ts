import z from "zod";
import { ManagerSchema } from "./ManagerSchema";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

export const TeamSchema = z.strictObject({
    team_key: z.string(),
    team_id: z.string(),
    name: z.string(),
    is_owned_by_current_login: z.string().optional(),
    url: z.string(),
    team_logos: z.object({
        team_logo: z.object({
            size: z.string(),
            url: z.string()
        })
    }),
    previous_season_team_rank: z.string().optional(),
    waiver_priority: z.string(),
    number_of_moves: z.string(),
    number_of_trades: z.string(),
    roster_adds: z.object({
        coverage_type: z.string(),
        coverage_value: z.string(),
        value: z.string()
    }),
    clinched_playoffs: z.string().optional(),
    league_scoring_type: z.string(),
    has_draft_grade: z.string(),
    draft_grade: z.string().optional(),
    draft_recap_url: z.string(),
    managers: z.object({
        manager: z.union([ManagerSchema, z.array(ManagerSchema)])
    })
});

export const TeamExtendedInfoSchema = TeamSchema.extend({
    win_probability: z.string(),
    team_points: z.object({
        coverage_type: z.string(),
        week: z.string(),
        total: z.string()
    }),
    team_projected_points: z.object({
        coverage_type: z.string(),
        week: z.string(),
        total: z.string()
    })
});

export const TeamResponseSchema = YahooFantasyContentBaseSchema.extend({
    team: TeamSchema
});

export type TeamResponse = z.infer<typeof TeamResponseSchema>;