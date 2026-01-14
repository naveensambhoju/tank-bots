const run = require("./rungame.cjs");

const results = [];
for (var i = 0; i < 50;i++){
    const {winner} = run();
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
