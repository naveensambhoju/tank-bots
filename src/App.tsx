import {useEffect, useRef, useState} from 'react'
import Game, { isObjectPosition} from './Game';
import './App.css'

const game = new Game();

function App() {
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        // console.log("dssds");
        game.init(setUpdate);

        return () => {
            game.endGame();
        }
    }, []);

    const renderObjects = (x,y) => {

        if (isObjectPosition(game.playerA, x, y)) {
            const classes = ["player", "playerA",
                game.playerA.direction,
                game.playerA.shooting ? "shooting" : "",
                game.playerA.destroyed ? "destroyed" : "",

            ];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

        if (isObjectPosition(game.playerB, x, y)) {
            const classes = ["player", "playerB",
                game.playerB.direction,
                game.playerB.shooting ? "shooting" : "",
                game.playerB.destroyed ? "destroyed" : ""
            ];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

        if (isObjectPosition(game.diamond, x, y) && game.diamond.visible) {
            const classes = ["diamond"];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

        if (isObjectPosition(game.bullet, x, y) && game.bullet.visible) {
            const classes = ["bullet"];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

    }

  return (
      <div>
            <div className="arena">
                {[...Array(game.STAGE_SIZE).keys()].map((y => (
                    <div className={"row"}>
                        {[...Array(game.STAGE_SIZE).keys()].map((x => (
                            <div className={"cell"}>
                                {/*<div className={"info"}> {x},{y}</div>*/}
                                {renderObjects(x,y)}
                            </div>
                        )))}
                    </div>
                )))}

            </div>
          <div className="round-number">{update}</div>
          <div className="game-message" >{game.message}</div>
      </div>
  )
}

export default App
