# Yahoo Fantasy API for TypeScript

WARNING: This repo is a work in progress and not yet ready for public consumption. If interested, follow along for the 1.0.0 release of the public API.

Beginnings of a TypeScript library for interacting with the Yahoo Fantasy Sports API. This library uses Zod for 
strongly typed API responses.

---

## Installation

````javascript
npm install
````

## API Design
A fluent / pseudo-fluent based API for consuming Yahoo's fantasy data. To begin, a client must create a `YahooFantasyClient` instance.

Basic usage:
````javascript
const client: YahooFantasyClient = new YahooFantasyClient("my-access-token");

/****** Game Resource ******/

// game
const game: GameResponse = client.game().withGameId("461").get();

/****** Games Collection ******/

// games
const games: GamesResponse = client.games().withGameKey("461").get();

/****** League Resource ******/

// league
const league: LeagueResponse = client.league("000.l.000000").get();

// draft results
const draftResults: LeagueDraftResultsResponse = client.league("000.l.000000").draftResults().get();

// teams
const teams: LeagueTeamsResponse = client.league("000.l.000000").teams().get();

// transactions
const transactions: LeagueTransactionsResponse = client.league("000.l.000000").transactions().get();

// scoreboard
const scoreboard: LeagueScoreboardResponse = client.league("000.l.000000").scoreboard().get();

// settings
const settings: LeagueSettingsResponse = client.league("000.l.000000").settings().get();

// standings
const standings: LeagueStandingsResponse = client.league("000.l.000000").standings().get();

/****** Team Resource ******/

// team
const team: TeamResponse = client.team().teamKey("000.l.000000.t.1").get();

// matchups
const teamMatchups: TeamMatchupsResponse = client.team().teamKey("000.l.000000.t.1").matchups().get();

// roster
const teamRoster: TeamRosterResponse = client.team().teamKey("000.l.000000.t.1").roster().get();

// stats
const teamStats: TeamStatsResponse = client.team().teamKey("000.l.000000.t.1").stats().get();

/****** Transaction Resource ******/

const transaction: TransactionResponse = client.transaction().withKey("223.l.431.tr.26").get();
````

## Tests & Linting
````javascript
npm run unitTest
````

## License
MIT License
=======
![Tests](https://github.com/axislove/yahoo-fantasy-ts/actions/workflows/test.yml/badge.svg)

[![npm version](https://img.shields.io/npm/v/yahoo-fantasy-wrapper.svg)](https://www.npmjs.com/package/yahoo-fantasy-typescript)
