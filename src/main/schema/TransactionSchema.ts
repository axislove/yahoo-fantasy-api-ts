import { z } from "zod";
import { PlayerBaseInfoSchema } from "./PlayerSchema";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

const TransactionDataSchema = z.strictObject({
    type: z.string(),
    source_type: z.string().optional(),
    source_team_key: z.string().optional(),
    source_team_name: z.string().optional(),
    destination_type: z.string().optional(),
    destination_team_key: z.string().optional(),
    destination_team_name: z.string().optional(),
});

const TransactionPlayerSchema = z.strictObject({
    ...PlayerBaseInfoSchema.shape,
    transaction_data: TransactionDataSchema,
});

export const TransactionSchema = z.strictObject({
    transaction_key: z.string(),
    transaction_id: z.string(),
    type: z.string(),
    status: z.string(),
    timestamp: z.string(),
    players: z.strictObject({
        count: z.string(),
        player: z.union([TransactionPlayerSchema, z.array(TransactionPlayerSchema)]),
    }),
});

export const TransactionResponseSchema = YahooFantasyContentBaseSchema.extend({
    transaction: TransactionSchema,
});

export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
