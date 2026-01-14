import {useCallback, useEffect, useRef, useState} from 'react'
import { isObjectPosition} from './util.js';
import gameData from "./match.json";
import './App.css'

const STAGE_SIZE = 8;

type ObjectData = {
    position: [number, number];
    direction?: number;
    type?: string;
    diamonds?: number;
    bullets?: number;
    shooting?: boolean;
    destroyed?: boolean;
    visible?: boolean;
}

type RoundDataType = {
    playerA: ObjectData,
    playerB: ObjectData,
    diamond: ObjectData,
    bullet: ObjectData,
}

function App() {
    const [round, setRound] = useState(0);
    const [roundData, setRoundData] = useState<RoundDataType>();

    const timer = useRef<number>(0);

    useCallback(function playRound(){
        if (round >= gameData.length){
            clearInterval(timer.current);
            return;
        }
        const data  = gameData[round];

        setRoundData({
            playerA: data.playerA,
            playerB: data.playerB,
            diamond: data.diamond,
            bullet: data.bullet,
        });

    }, [round]);

    useEffect(() => {
        console.log("gameData", gameData.length);
        // game.init(setUpdate);

        timer.current = setInterval(function(){
            playRound();
            setRound((round) => round+1);
            console.log("round", round);

        }, 1000)

        return () => {
            clearInterval(timer.current);
        }
    }, [playRound, round]);



    const renderObjects = (x,y) => {

        if (!roundData) return;

        if (isObjectPosition(roundData.playerA, x, y)) {
            const classes = ["player", "playerA",
                roundData.playerA.direction,
                roundData.playerA.shooting ? "shooting" : "",
                roundData.playerA.destroyed ? "destroyed" : "",
            ];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

        if (isObjectPosition(roundData.playerB, x, y)) {
            const classes = ["player", "playerB",
                roundData.playerB.direction,
                roundData.playerB.shooting ? "shooting" : "",
                roundData.playerB.destroyed ? "destroyed" : ""
            ];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

        if (isObjectPosition(roundData.diamond, x, y) && roundData.diamond.visible) {
            const classes = ["diamond"];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

        if (isObjectPosition(roundData.bullet, x, y) && roundData.bullet.visible) {
            const classes = ["bullet"];

            return (
                <div className={classes.join(" ")} ></div>
            )
        }

    }


  return (
      <div>
            <div className="arena">
                {[...Array(STAGE_SIZE).keys()].map((y => (
                    <div className={"row"}>
                        {[...Array(STAGE_SIZE).keys()].map((x => (
                            <div className={"cell"}>
                                {/*<div className={"info"}> {x},{y}</div>*/}
                                {renderObjects(x,y)}
                            </div>
                        )))}
                    </div>
                )))}

            </div>
          <div className="round-number">{round}</div>
          {/*<div className="game-message" >{game.message}</div>*/}
      </div>
  )
}

export default App
