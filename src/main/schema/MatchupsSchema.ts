import z from "zod";
import { TeamExtendedInfoSchema } from "./TeamSchema";

export const MatchupGradeSchema = z.strictObject({
    team_key: z.string(),
    grade: z.string()
});

export const MatchupSchema = z.strictObject({
    week: z.string(),
    week_start: z.string(),
    week_end: z.string(),
    status: z.string(),
    is_playoffs: z.string(),
    is_consolation: z.string(),
    is_matchup_of_the_week: z.string(),
    is_matchup_recap_available: z.string(),
    matchup_recap_url: z.string().optional(),
    matchup_recap_title: z.string().optional(),
    matchup_grades: z.object({
        matchup_grade: z.array(MatchupGradeSchema)}
    ).optional(),
    is_tied: z.string().optional(),
    winner_team_key: z.string().optional(),
    teams: z.object({
        count: z.string(),
        team: z.array(TeamExtendedInfoSchema)
    })
});

export const MatchupsSchema = z.strictObject({
    count: z.string(),
    matchup: z.union([MatchupSchema, z.array(MatchupSchema)])
});