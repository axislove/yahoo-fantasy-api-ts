import z from "zod";

export const PlayerBaseInfoSchema = z.strictObject({
    player_key: z.string(),
    player_id: z.string(),
    name: z.object({
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
    bye_weeks: z.object({
        week: z.string()
    }),
    is_keeper: z.object({
        status: z.string(),
        cost: z.string(),
        kept: z.string().optional()
    }),
    uniform_number: z.string(),
    headshot: z.object({
        url: z.string(),
        size: z.string()
    }),
    image_url: z.string(),
    is_undroppable: z.string(),
    primary_position: z.string().optional(),
    eligible_positions: z.object({
        position: z.union([z.string(), z.array(z.string())])
    }),
    eligible_positions_to_add: z.string(),
    has_player_notes: z.string().optional(),
    has_recent_player_notes: z.string().optional(),
    player_notes_last_timestamp: z.string().optional(),
    selected_position: z.object({
        coverage_type: z.string(),
        week: z.string(),
        position: z.string(),
        is_flex: z.string()
    }).optional(),
    is_editable: z.string().optional(),
    player_points: z.object({
        coverage_type: z.string(),
        week: z.string(),
        total: z.string()
    }).optional()
});