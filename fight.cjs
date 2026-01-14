const fs = require('fs');

const run = require("./rungame.cjs");

// Get file paths from command line arguments
const file1Path = process.argv[2];
const file2Path = process.argv[3];
const seed = process.argv[4];

const {winner, gameData} = run(file1Path, file2Path, seed);

console.log("Winner", winner);

fs.writeFileSync(
    'src/match.json',
    JSON.stringify(gameData, null, 2),
    'utf-8'
);