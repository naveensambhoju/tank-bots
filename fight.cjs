// app.js
const path = require('path');
const fs = require('fs');

// Get file paths from command line arguments
const file1Path = process.argv[2];
const file2Path = process.argv[3];
const seed = process.argv[4];

if (!file1Path || !file2Path) {
    console.error("Please provide two JS file paths.");
    process.exit(1);
}

// Resolve absolute paths
const botA = require(path.resolve(file1Path));
const botB = require(path.resolve(file2Path));
const Game = require("./game.cjs");

console.log("Game", Game, botA, botB);

const game = new Game(botA, botB, seed);

const gameData = game.init();


fs.writeFileSync(
    'src/match.json',
    JSON.stringify(gameData, null, 2),
    'utf-8'
);