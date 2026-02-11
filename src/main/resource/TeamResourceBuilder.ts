import { ZodType } from "zod";
import { PathBuilder } from "../PathBuilder";
import { RequestExecutor } from "../RequestExecutor";
import { TeamMatchupsResponse, TeamMatchupsResponseSchema } from "../schema/TeamMatchupsSchema";
import { TeamResponse, TeamResponseSchema, TeamRosterResponse, TeamRosterResponseSchema, TeamStatsResponse, TeamStatsResponseSchema } from "../schema/TeamSchema";
import { ExecutableResource } from "../ExecutableResource";

export class TeamResourceBuilder extends ExecutableResource<TeamResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(teamKey: string, executor: RequestExecutor) {
        return new TeamResourceBuilder(TeamResponseSchema, executor, new PathBuilder(`/team/${teamKey}`));
    }

    matchups(): MatchupsSubResource {
        return MatchupsSubResource.create(this.executor, this.pathBuilder.withResource('matchups'));
    }

    roster(): RosterSubResource {
        return RosterSubResource.create(this.executor, this.pathBuilder.withResource('roster'));
    }

    stats(): StatsSubResource {
        return StatsSubResource.create(this.executor, this.pathBuilder.withResource('stats'));
    }
}

class MatchupsSubResource extends ExecutableResource<TeamMatchupsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new MatchupsSubResource(TeamMatchupsResponseSchema, executor, pathBuilder);
    }

    weeks(weeks: number[]): ExecutableResource<TeamMatchupsResponse> {

        const filterParams: Map<string, string[]> = new Map<string, string[]>();

        // convert to string for filter param logic
        const weeksAsStrings: string[] = weeks.map((week: number) => {
            return week.toString();
        });

        filterParams.set('weeks', weeksAsStrings);
        this.pathBuilder.withParams(filterParams);
        return this;
    }
}

// TODO: add 'date filter for non-nfl games
class RosterSubResource extends ExecutableResource<TeamRosterResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new RosterSubResource(TeamRosterResponseSchema, executor, pathBuilder);
    }

    week(week: number): ExecutableResource<TeamRosterResponse> {
        this.pathBuilder.withParam('week', week.toString());
        return this;
    }
}

// TODO: add 'date' filter for non-nfl games
class StatsSubResource extends ExecutableResource<TeamStatsResponse> {

    private constructor(schema: ZodType, executor: RequestExecutor, pathBuilder: PathBuilder) {
        super(schema, executor, pathBuilder);
    }

    static create(executor: RequestExecutor, pathBuilder: PathBuilder) {
        return new StatsSubResource(TeamStatsResponseSchema, executor, pathBuilder);
    }

    season(): ExecutableResource<TeamStatsResponse> {
        this.pathBuilder.withParam('type', 'season');
        return this;
    }

    week(week: number): ExecutableResource<TeamStatsResponse> {
        this.pathBuilder.withParam('type', 'week');
        this.pathBuilder.withParam('week', week.toString());
        return this;
    }
}