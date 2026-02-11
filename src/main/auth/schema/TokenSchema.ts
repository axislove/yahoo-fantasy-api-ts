import { z } from "zod";

export const TokenSchema = z.strictObject({
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
    token_type: z.string()
});

export type TokenResponse = z.infer<typeof TokenSchema>;