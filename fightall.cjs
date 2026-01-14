const fs = require('fs');
const path = require("path");

const run = require("./rungame.cjs");

function findAllFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            findAllFiles(fullPath, files);
        } else if (entry.isFile()) {
            files.push(fullPath);
        }
    }

    return files;
}

const absPath = path.resolve("bots/");

if (!fs.existsSync(absPath)) {
    console.error("Folder does not exist:", absPath);
    process.exit(1);
}

const result = findAllFiles(absPath);
const wins = {};

for (const entry of result) {
    wins[entry] = 0;
}

for (let i = 0; i < result.length; i++) {
    const file1 =  result[i];
    for(j = i + 1; j < result.length; j++) {
        const file2 =  result[j];

        for (let k = 0;k < 200;k++){
            const {winner} = run(file1, file2);
            if (winner === "A") wins[file1]++;
            else if (winner === "B") wins[file2]++;
        }

    }
}

console.log("wins", wins);