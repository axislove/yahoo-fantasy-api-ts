import { z } from "zod";

export const ManagerSchema = z.strictObject({
    manager_id: z.string(),
    nickname: z.string(),
    guid: z.string(),
    is_commissioner: z.string().optional(),
    is_current_login: z.string().optional(),
    is_comanager: z.string().optional(),
    image_url: z.string(),
    felo_score: z.string(),
    felo_tier: z.string()
});