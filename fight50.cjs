const run = require("./rungame.cjs");

// Get file paths from command line arguments
const file1Path = process.argv[2];
const file2Path = process.argv[3];
const seed = process.argv[4];


const results = [];
for (var i = 0; i < 50;i++){
    const {winner} = run(file1Path,file2Path,seed);
    results.push(winner);
}

const group = {A: 0, B: 0, Draw: 0};

for(let r of results){
    if (r === "A") group.A++;
    else if (r === "B") group.B++;
    else group.Draw++;
}

console.log("Results", results);
console.log("Total", group);
