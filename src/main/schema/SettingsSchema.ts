import { z } from "zod";
import { LeagueSchema } from './LeagueSchema';
import { YahooFantasyContentBaseSchema } from './FantasyContentSchema';

const RosterPositionSchema = z.strictObject({
  position: z.string(),
  position_type: z.string().optional(),
  count: z.string(),
  is_starting_position: z.string()
});

const RosterPositionsSchema = z.strictObject({
  roster_position: z.array(RosterPositionSchema)
});

const StatSchema = z.strictObject({
  stat_id: z.string(),
  enabled: z.string(),
  name: z.string(),
  display_name: z.string(),
  group: z.string(),
  abbr: z.string(),
  sort_order: z.string(),
  position_type: z.string(),
  stat_position_types: z.strictObject({
    stat_position_type: z.strictObject({
      position_type: z.string(),
      is_only_display_stat: z.string().optional()
    })
  }),
  is_only_display_stat: z.string().optional(),
  is_excluded_from_display: z.string().optional()
});

const GroupSchema = z.strictObject({
  group_name: z.string(),
  group_display_name: z.string(),
  group_abbr: z.string()
});

const GroupsSchema = z.strictObject({
  group: z.array(GroupSchema)
});

const StatsSchema = z.strictObject({
  stat: z.array(StatSchema),
});

const StatCategoriesSchema = z.strictObject({
  stats: StatsSchema,
  groups: GroupsSchema
});

const StatModifierSchema = z.strictObject({
  stat_id: z.string(),
  value: z.string()
});

const StatModifiersSchema = z.strictObject({
  stats: z.strictObject({
    stat: z.array(StatModifierSchema)
  })
});

export const SettingsSchema = z.strictObject({
  draft_type: z.string(),
  is_auction_draft: z.string(),
  scoring_type: z.string(),
  is_highscore: z.string(),
  invite_permission: z.string(),
  uses_playoff: z.string(),
  has_playoff_consolation_games: z.string(),
  playoff_start_week: z.string(),
  uses_playoff_reseeding: z.string(),
  uses_lock_eliminated_teams: z.string(),
  num_playoff_teams: z.string(),
  num_playoff_consolation_teams: z.string(),
  has_multiweek_championship: z.string(),
  waiver_type: z.string(),
  waiver_rule: z.string(),
  uses_faab: z.string(),
  draft_time: z.string(),
  draft_pick_time: z.string(),
  post_draft_players: z.string(),
  max_teams: z.string(),
  waiver_time: z.string(),
  trade_end_date: z.string(),
  trade_ratify_type: z.string(),
  trade_reject_time: z.string(),
  player_pool: z.string(),
  cant_cut_list: z.string(),
  draft_together: z.string(),
  sendbird_channel_url: z.string(),
  roster_positions: RosterPositionsSchema,
  stat_categories: StatCategoriesSchema,
  stat_modifiers: StatModifiersSchema,
  uses_median_score: z.string().optional(),
  league_premium_features: z.string().optional(),
  pickem_enabled: z.string().optional(),
  uses_fractional_points: z.string(),
  uses_negative_points: z.string(),
});

const LeagueSettingsSchema = z.strictObject({
    ...LeagueSchema.shape,
    settings: SettingsSchema
});

// extend fantasy_content, place leagueSettings schema in league
export const LeagueSettingsResponseSchema = YahooFantasyContentBaseSchema.extend({
  league: LeagueSettingsSchema
});

export type LeagueSettingsResponse = z.infer<typeof LeagueSettingsResponseSchema>;