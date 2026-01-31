# Yahoo Fantasy API for TypeScript

A modern TypeScript library for interacting with the Yahoo Fantasy Sports API.  
Provides type-safe access to league, team, and player data with a fluent API design.

---

## Features

- Type-safe API requests using TypeScript
- Fluent API for easy chaining
- Supports leagues, teams, players, transactions, and more
- Handles Yahoo OAuth authentication
- Designed for building fantasy football apps, dashboards, and analytics

---

## Installation

````javascript
npm install
````

## API Design

````javascript
// get top 3 highest scoring QBs for week 7
client
  .league('123.l.456')
  .players()
  .week('7')
  .sortBy(Sort.PTS)
  .position('QB')
  .count(3)
  .get();
````

## Tests & Linting

````javascript
// run unit and integration tests
npm run test
````

````javascript
// lint your code contributions
npm run lint
````

## License
MIT License
=======
![Tests](https://github.com/axislove/yahoo-fantasy-typescript/actions/workflows/test.yml/badge.svg)

[![npm version](https://img.shields.io/npm/v/yahoo-fantasy-wrapper.svg)](https://www.npmjs.com/package/yahoo-fantasy-typescript)
