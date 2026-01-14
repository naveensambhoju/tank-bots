function run(file1Path, file2Path, seed) {


    // app.js
    const path = require('path');



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

    const {gameData, winner} = game.init();

    return {gameData, winner};
}

module.exports = run;