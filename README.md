# Welcome to Tank BOTS!
This is a developer bot competition game, where 2 developers bot fight.

![screenshot](public/screenshot.png)

# Rules
- The game has 2 tanks, bot A and bot B.
- There are 120 rounds in the game. 1 round is somewhat equal to 1 second.
- A bot can only make 1 move per round.
- It can either move forward, rotate, shoot.
- The tanks have only 1 bullet at beginning of the game.
- A diamond spawns in the game, which can be collected by the bots/tanks by reach to their positions.
- A bullet spawns in the game randomly too, which can be collected too.
- There are 8x8 squares in the arena, which the tanks/bots/objects can be positioned.
- If 2 tanks land in same position, they both get destoryed and game ends, who ever has highest diamonds win.
- A tank can shoot another tank if it has bullet and it is in the same line.
- If 2 tanks shoot each other at same time, then the bullets get cancelled.


# How to play
- We have an sample bot at `bots/random.cjs`. 
- These are the 2 bots, you can modify one of them to your own skill and win the game.
- To run the game you can use `node fight.cjs <bot1_path> <bot2_path> <seed>`.
- `seed` is optional here. Example command: `node fight.cjs bots/botA.cjs bots/botB.cjs`.
- For start you can try `node fight.cjs bots/random.cjs bots/random.cjs` where the random bot fights with itself.
- Once you run the game, you can play the game in browser using `npm run dev`.

## Improve your bot
To improve your bot, you need to play multiple times with all other bots, for that we 
created this command below, which will fight that opposition 50 times. You can modify that to more
if you like in the `fight50.cjs`.

`node fight50.cjs <bot1_path> <bot2_path>`