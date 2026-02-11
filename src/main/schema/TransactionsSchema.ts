import { z } from 'zod';
import { LeagueSchema } from './LeagueSchema';
import { PlayerBaseInfoSchema } from './PlayerSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

export const TransactionDataSchema = z.strictObject({
    type: z.string(),
    source_type: z.string(),
    destination_type: z.string(),
    destination_team_key: z.string().optional(),
    destination_team_name: z.string().optional(),
    source_team_key: z.string().optional(),
    source_team_name: z.string().optional()
});

// contains basic player info in each transaction object
export const PlayerTransactionInfoSchema = z.strictObject({
    ...PlayerBaseInfoSchema.shape,
    transaction_data: TransactionDataSchema
});

export const TransactionBaseSchema = z.strictObject({
    transaction_key: z.string(),
    transaction_id: z.string(),
    type: z.string(),
    status: z.string(),
    timestamp: z.string(),
    trader_team_key: z.string().optional(),
    trader_team_name: z.string().optional(),
    tradee_team_key: z.string().optional(),
    tradee_team_name: z.string().optional()
});

export const PlayersTransactionSchema = z.strictObject({
    ...TransactionBaseSchema.shape,
    players: z.strictObject({
        count: z.string(),
        player: z.union([PlayerTransactionInfoSchema, z.array(PlayerTransactionInfoSchema)])
    })
});

export const LeagueTransactionsSchema = z.strictObject({
    ...LeagueSchema.shape,
    transactions: z.strictObject({
        count: z.string(),
        transaction: z.array(z.union([TransactionBaseSchema, PlayersTransactionSchema]))
    })
});

export const LeagueTransactionsResponseSchema = YahooFantasyContentBaseSchema.extend({
    league: LeagueTransactionsSchema
});

export type LeagueTransactionsResponse = z.infer<typeof LeagueTransactionsResponseSchema>;