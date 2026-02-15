import { z } from 'zod';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

export const PlayerBaseInfoSchema = z.strictObject({
    player_key: z.string(),
    player_id: z.string(),
    name: z.strictObject({
        full: z.string(),
        first: z.string(),
        last: z.string(),
        ascii_first: z.string(),
        ascii_last: z.string()
    }),
    editorial_team_abbr: z.string(),
    display_position: z.string(),
    position_type: z.string(),
});

export const PlayerSchema = z.strictObject({
    ...PlayerBaseInfoSchema.shape,
    url: z.string(),
    status: z.string().optional(),
    status_full: z.string().optional(),
    injury_note: z.string().optional(),
    editorial_player_key: z.string(),
    editorial_team_key: z.string(),
    editorial_team_full_name: z.string(),
    editorial_team_url: z.string(),
    bye_weeks: z.strictObject({
        week: z.string()
    }),
    is_keeper: z.strictObject({
        status: z.string(),
        cost: z.string(),
        kept: z.string().optional()
    }),
    uniform_number: z.string(),
    headshot: z.strictObject({
        url: z.string(),
        size: z.string()
    }),
    image_url: z.string(),
    is_undroppable: z.string(),
    primary_position: z.string().optional(),
    eligible_positions: z.strictObject({
        position: z.union([z.string(), z.array(z.string())])
    }),
    eligible_positions_to_add: z.string(),
    has_player_notes: z.string().optional(),
    has_recent_player_notes: z.string().optional(),
    player_notes_last_timestamp: z.string().optional(),
    selected_position: z.strictObject({
        coverage_type: z.string(),
        week: z.string(),
        position: z.string(),
        is_flex: z.string()
    }).optional(),
    is_editable: z.string().optional(),
    player_points: z.strictObject({
        coverage_type: z.string(),
        week: z.string().optional(),
        season: z.string().optional(),
        total: z.string()
    }).optional()
});

const PlayerDraftAnalysisSchema = z.strictObject({
    ...PlayerSchema.shape,
    draft_analysis: z.object({
        average_pick: z.string(),
        average_round: z.string(),
        average_cost: z.string(),
        percent_drafted: z.string(),
        preseason_average_pick: z.string(),
        preseason_average_round: z.string(),
        preseason_average_cost: z.string(),
        preseason_percent_drafted: z.string()
    })
});

const PlayerPercentOwned = z.strictObject({
    ...PlayerSchema.shape,
    percent_owned: z.object({
        coverage_type: z.string(),
        week: z.string(),
        value: z.string(),
        delta: z.string()
    })
});

const StatSchema = z.strictObject({
    stat_id: z.string(),
    value: z.string()
});

const StatsSchema = z.strictObject({
    coverage_type: z.string(),
    season: z.string(),
    stats: z.strictObject({
        stat: z.array(StatSchema)
    })
});

const PlayerStatsSchema = z.strictObject({
    ...PlayerSchema.shape,
    player_stats: StatsSchema,
    player_advanced_stats: StatsSchema
});

export const PlayerResponseSchema = YahooFantasyContentBaseSchema.extend({
    player: PlayerSchema
});
export type PlayerResponse = z.infer<typeof PlayerResponseSchema>;

export const PlayerDraftAnalysisResponseSchema = YahooFantasyContentBaseSchema.extend({
    player: PlayerDraftAnalysisSchema
});
export type PlayerDraftAnalysisResponse = z.infer<typeof PlayerDraftAnalysisResponseSchema>;

export const PlayerPercentOwnedReponseSchema = YahooFantasyContentBaseSchema.extend({
    player: PlayerPercentOwned
});
export type PlayerPercentOwnedResponse = z.infer<typeof PlayerPercentOwnedReponseSchema>;

export const PlayerStatsResponseSchema = YahooFantasyContentBaseSchema.extend({
    player: PlayerStatsSchema
});
export type PlayerStatsResponse = z.infer<typeof PlayerStatsResponseSchema>;