import { z } from "zod";
import { YahooFantasyContentBaseSchema } from "./FantasyContentSchema";

export const LeagueSchema = z.strictObject({
  league_key: z.string(),
  league_id: z.string(),
  name: z.string(),
  url: z.string(),
  logo_url: z.string(),
  password: z.string(),
  draft_status: z.string(),
  num_teams: z.string(),
  edit_key: z.string(),
  weekly_deadline: z.string(),
  roster_type: z.string(),
  league_update_timestamp: z.string(),
  scoring_type: z.string(),
  league_type: z.string(),
  renew: z.string(),
  renewed: z.string(),
  felo_tier: z.string(),
  is_highscore: z.string(),
  matchup_week: z.string(),
  iris_group_chat_id: z.string(),
  short_invitation_url: z.string(),
  allow_add_to_dl_extra_pos: z.string(),
  is_pro_league: z.string(),
  is_cash_league: z.string(),
  current_week: z.string(),
  start_week: z.string(),
  start_date: z.string(),
  end_week: z.string(),
  end_date: z.string(),
  is_finished: z.string().optional(),
  is_plus_league: z.string(),
  game_code: z.string(),
  season: z.string(),
});

export const LeagueResponseSchema = YahooFantasyContentBaseSchema.extend({
  league: LeagueSchema
});

export type LeagueResponse = z.infer<typeof LeagueResponseSchema>;