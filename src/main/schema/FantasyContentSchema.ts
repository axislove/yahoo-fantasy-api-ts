import { z } from 'zod';

// empty schema for all responses to extend from
export const YahooFantasyContentBaseSchema = z.object();

// has some additional keys alongside fantasy_content, so allow loose schema here
export const YahooFantasyResponseSchema = z.looseObject({
    fantasy_content: YahooFantasyContentBaseSchema
});

export type YahooFantasyResponse = z.infer<typeof YahooFantasyContentBaseSchema>;
