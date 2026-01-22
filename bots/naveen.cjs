const { getPriority } = require("os");

function main(mapData) {
  const myData = mapData.find((item) => item.type === "you");
  const opponent = mapData.find((item) => item.type === "opponent");
  const bullet = mapData.find((item) => item.type === "bullet");
  const diamond = mapData.find((item) => item.type === "diamond");
  let target = undefined;
  let facing = undefined;

  function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
  }

  function findTarget() {
    const bulletDistance = distance(myData.position, bullet?.position || 100);
    const diamondDistance = distance(myData.position, diamond?.position || 100);
    const opponentDistance = distance(myData.position, opponent.position);
    if (
      parseInt(myData.position[0] - opponent.position[0], 10) <= 1 ||
      parseInt(myData.position[1] - opponent.position[1], 10) <= 1
    ) {
      target = opponent;
    } else if (
      bulletDistance < diamondDistance &&
      bulletDistance < opponentDistance
    ) {
      target = bullet;
    } else if (
      diamondDistance < bulletDistance &&
      diamondDistance < opponentDistance
    ) {
      target = diamond;
    } else {
      target = opponent;
    }
  }

  function canFire() {
    if (myData.bullets <= 0) return false;

    const [x, y] = myData.position;
    const [ox, oy] = opponent.position;

    return (
      (x === ox && y > oy && myData.direction === "up") ||
      (x === ox && y < oy && myData.direction === "down") ||
      (y === oy && x > ox && myData.direction === "left") ||
      (y === oy && x < ox && myData.direction === "right")
    );
  }

  function getFacing() {
    const dx = target.position[0] - myData.position[0];
    const dy = target.position[1] - myData.position[1];

    // Possible directions toward target
    const candidates = [];

    if (dx > 0) candidates.push("right");
    if (dx < 0) candidates.push("left");
    if (dy > 0) candidates.push("down"); // top-left grid
    if (dy < 0) candidates.push("up");

    // Prefer dominant axis
    candidates.sort((a, b) => {
      const isX = (d) => d === "left" || d === "right";
      const weight = (d) => (isX(d) ? Math.abs(dx) : Math.abs(dy));
      return weight(b) - weight(a);
    });

    // 🚫 Remove opponent direction ONLY if target is opponent
    const safeCandidates =
      target.type === "opponent"
        ? candidates.filter((d) => d !== target.direction)
        : candidates;

    return safeCandidates[0] ?? false;
  }

  function canRotate() {
    facing = getFacing();
    if (facing === "right" && myData.direction !== "right") {
      return "rotate-right";
    } else if (facing === "left" && myData.direction !== "left") {
      return "rotate-left";
    } else if (facing === "down" && myData.direction !== "down") {
      return "rotate-down";
    } else if (facing === "up" && myData.direction !== "up") {
      return "rotate-up";
    } else {
      return false;
    }
  }

  if (canFire()) {
    return "shoot";
  }
  findTarget();

  let rotate = canRotate();

  if (rotate) {
    return rotate;
  } else {
    return myData.direction;
  }
}

module.exports = main;
