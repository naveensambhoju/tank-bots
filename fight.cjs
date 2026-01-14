const fs = require('fs');

const run = require("./rungame.cjs");

const {winner, gameData} = run();

console.log("Winner", winner);

fs.writeFileSync(
    'src/match.json',
    JSON.stringify(gameData, null, 2),
    'utf-8'
);