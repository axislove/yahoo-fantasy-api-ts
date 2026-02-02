import z from "zod";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

const GameSchema = z.object({
    game_key: z.string(),
    game_id: z.string(),
    name: z.string(),
    code: z.string(),
    type: z.string(),
    url: z.string(),
    season: z.string(),
    is_registration_over: z.string(),
    is_game_over: z.string(),
    is_offseason: z.string()
})

export const GamesSchema = z.object({
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