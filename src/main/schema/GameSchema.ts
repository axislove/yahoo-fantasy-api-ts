import { z } from "zod";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

const GameSchema = z.strictObject({
    game_key: z.string(),
    game_id: z.string(),
    name: z.string(),
    code: z.string(),
    type: z.string(),
    url: z.string(),
    season: z.string(),
    is_registration_over: z.string(),
    is_game_over: z.string(),
    is_offseason: z.string(),
    current_week: z.string().optional(),
    is_contest_reg_active: z.string().optional(),
    is_contest_over: z.string().optional(),
    has_schedule: z.string().optional(),
    alternate_start_deadline: z.string().optional()
})

export const GamesSchema = z.strictObject({
    count: z.string(),
    game: z.union([GameSchema, z.array(GameSchema)])
})

export const GameResponseSchema = YahooFantasyContentBaseSchema.extend({
    game: GameSchema
});

export const GamesResponseSchema = YahooFantasyContentBaseSchema.extend({
    games: GamesSchema
});

export type GameResponse = z.infer<typeof GameResponseSchema>;
export type GamesResponse = z.infer<typeof GamesResponseSchema>;