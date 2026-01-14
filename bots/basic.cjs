/**
 * A simple bot.
 * - Moves towards the Diamond always
 */

function main(mapData) {
    // console.log(mapData);
    // ---- PARSE GAME STATE ----
    const you = mapData.find(e => e.type === "you");
    const enemy = mapData.find(e => e.type === "opponent");
    const diamond = mapData.find(e => e.type === "diamond");
    const bullet = mapData.find(e => e.type === "bullet");

    if (!you || !enemy) {
        // Safety fallback
        return "none";
    }

    if (isEnemyInShootLine() && you.bullets > 0) return "shoot";

    if (diamond){
        console.log("diamond", diamond);
        if (diamond.position[0] > you.position[0]){
            if (you.direction === "right") return "right";
            else return "rotate-right";
        }
        else if (diamond.position[0] < you.position[0]){
            if (you.direction === "left") return "left";
            else return "rotate-left";
        }
        else {
            if (diamond.position[1] > you.position[1]){
                if (you.direction === "down") return "down";
                else return "rotate-down";
            }
            else if (diamond.position[1] < you.position[1]){
                if (you.direction === "up") return "up";
                else return "rotate-up";
            }
        }
    }

    // ---- FALLBACK MOVEMENT ----
    return "none";
}

function isEnemyInShootLine(you,enemy){
    return false;
}

module.exports = main;
