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

// get game resource
const gameResponse: GameResponse = client.game().withGameId("461").get();

// get games collection
const gamesResponse: GamesResponse = client.games().withGameKey("461").get();
````

## Tests & Linting
````javascript
npm run unitTest
```

## License
MIT License
=======
![Tests](https://github.com/axislove/yahoo-fantasy-ts/actions/workflows/test.yml/badge.svg)

[![npm version](https://img.shields.io/npm/v/yahoo-fantasy-wrapper.svg)](https://www.npmjs.com/package/yahoo-fantasy-typescript)
