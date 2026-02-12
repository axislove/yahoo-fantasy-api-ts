import z from "zod";
import { LeagueSchema } from './LeagueSchema';
import { PlayerSchema } from "./PlayerSchema";
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

const PlayersSchema = z.object({
    count: z.string(),
    player: z.array(PlayerSchema)
});

const LeaguePlayersSchema = z.strictObject({
    ...LeagueSchema.shape,
    players: PlayersSchema
});

export const LeaguePlayersResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeaguePlayersSchema
});

export type LeaguePlayersResponse = z.infer<typeof LeaguePlayersResponseSchema>;