import botA from "./BotA";
import botB from "./BotB";

export default  class Game {
    onRoundUpdate: (number: number) => void;

    message= "";

    playerA = {
        position: [0,0],
        direction: "down",
        diamonds: 0,
        bullets: 1,
        shooting: false,
        destroyed: false
    }
    playerB = {
        position: [7,7],
        direction: "up",
        diamonds: 0,
        bullets: 1,
        shooting: false,
        destroyed: false
    }

    diamond = {
        position: [-1,-1],
        direction: null,
        visible: false,
    }

    bullet = {
        position: [-1,-1],
        direction: null,
        visible: false
    }

    ROUND_SIZE= 500

    ROUND_TIMER = 250

    ROUND_INTERVAL?: number = undefined;

    CURRENT_ROUND = 0;

    STAGE_SIZE = 8;

    STAGE_END_POSITION =  this.STAGE_SIZE - 1;

    init(theOnRoundUpdate){
        // console.log("ININT");
        this.CURRENT_ROUND = 0;
        this.ROUND_INTERVAL = setInterval( ()=> {
            // console.log("ROUND_INTERVAL");
            this.round();
            }, this.ROUND_TIMER);
        this.onRoundUpdate = theOnRoundUpdate;

    }


    performAction(action, player, opponent, name){
        console.log("performAction", action, name);
        switch (action) {
            case "left":{
                if (player.direction === "left" &&  player.position[0] != 0){
                    player.position = [player.position[0]-1, player.position[1]];
                }
                break;
            }
            case "right":{
                if (player.direction === "right" &&  player.position[0] != this.STAGE_END_POSITION){
                    player.position = [player.position[0]+1, player.position[1]];
                }
                break;
            }
            case "up":{
                if (player.direction === "up" &&  player.position[1] != 0){
                    player.position = [player.position[0], player.position[1]-1];
                }
                break;
            }
            case "down":{
                if (player.direction === "down" &&  player.position[1] != this.STAGE_END_POSITION){
                    player.position = [player.position[0], player.position[1]+1];
                }
                break;
            }
            case "rotate-up": {
                player.direction = "up";
                break;
            }
            case "rotate-down": {
                player.direction = "down";
                break;
            }
            case "rotate-left": {
                player.direction = "left";
                break;
            }
            case "rotate-right": {
                player.direction = "right";
                break;
            }
            case "shoot": {
                player.shooting = true;
                if (this.canPlayerShootOther(player, opponent) && player.bullets > 0){
                    opponent.destroyed = true;
                    this.gameOver(name);

                }
                break;
            }
            default: {}
        }
    }


    round(){
        // console.log("round");
        this.CURRENT_ROUND++;

        const aAction = botA([
            {
                type: "you",
                ...this.playerA
            },
            {
                type: "opponent",
                ...this.playerB
            },
            this.diamond,
            this.bullet
        ]);

        const bAction = botB([
            {
                type: "you",
                ...this.playerB
            },
            {
                type: "opponent",
                ...this.playerA
            },
            this.diamond,
            this.bullet
        ]);

        console.log("round", this.CURRENT_ROUND);

        this.playerA.shooting = false;
        this.playerB.shooting = false;
        this.performAction(aAction, this.playerA, this.playerB, "A");
        this.performAction(bAction, this.playerB, this.playerA, "B");
        this.manageConsumptions();

        this.manageObjects();

        if (this.CURRENT_ROUND >= this.ROUND_SIZE) {
            clearInterval(this.ROUND_INTERVAL);
        }

        this.onRoundUpdate(this.CURRENT_ROUND);
        // console.log("this.round", this.CURRENT_ROUND)

    }

    manageConsumptions(){
        if (areObjectsColliding(this.playerA, this.diamond)){
            this.diamond.visible = false;
            this.playerA.diamonds++;
        }
        if (areObjectsColliding(this.playerB, this.diamond)){
            this.diamond.visible = false;
            this.playerB.diamonds++;
        }
        if (areObjectsColliding(this.playerA, this.bullet)){
            this.bullet.visible = false;
            this.playerA.bullets++;
        }
        if (areObjectsColliding(this.playerB, this.bullet)){
            this.bullet.visible = false;
            this.playerB.bullets++;
        }
        if (areObjectsColliding(this.playerB, this.playerA)){
            this.gameOver(null);
        }

    }

    canPlayerShootOther(shooter, victim){
        if (shooter.direction === "down" && victim.position[0] === shooter.position[0] && victim.position[1] > shooter.position[1]) return true;
        if (shooter.direction === "up" && victim.position[0] === shooter.position[0] && victim.position[1] < shooter.position[1]) return true;
        if (shooter.direction === "left" && victim.position[1] === shooter.position[1] && victim.position[0] < shooter.position[0]) return true;
        if (shooter.direction === "right" && victim.position[1] === shooter.position[1] && victim.position[0] > shooter.position[0]) return true;
        return false;
    }

    gameOver(winner){
        if (winner != null){
            this.message = "Game Over! winner:"+  winner;
        }
        else if (this.playerA.diamonds > this.playerB.diamonds){
            this.message = ("Game Over! winner:"+  "A");
        }
        else if (this.playerA.diamonds < this.playerB.diamonds){
            this.message = ("Game Over! winner:"+  "B");
        }
        else {
            this.message = ("Game Over! No Winner");
        }

        this.endGame();
    }

    endGame(){
        clearInterval(this.ROUND_INTERVAL);
    }

    manageObjects() {

        if (!this.diamond.visible) {
            debugger;
            let r = [-1,-1];
            do{
                r = this.getRandomPosition();
            }
            while (this.isThereAnyObjectAlreadyInPosition(r[0], r[1]));

            this.diamond.position = r;
            this.diamond.visible = true;

        }

        if (!this.bullet.visible && getRandomNumber(5) === 0) {

            let r = [-1,-1];
            do{
                r = this.getRandomPosition();
            }
            while (this.isThereAnyObjectAlreadyInPosition(r[0], r[1]));

            this.bullet.position = r;
            this.bullet.visible = true;

        }
    }


    getRandomPosition(){
        return [Math.floor(Math.random() * this.STAGE_SIZE), Math.floor(Math.random() * this.STAGE_SIZE)];
    }

    isThereAnyObjectAlreadyInPosition(x,y){
        if (isObjectPosition(this.playerA, x, y)) return true;
        if (isObjectPosition(this.playerB, x, y)) return true;
        if (isObjectPosition(this.diamond, x, y)) return true;
        if (isObjectPosition(this.bullet, x, y)) return true;
    }
}

function areObjectsColliding(object1, object2){
    return object1.position[0] == object2.position[0] && object1.position[1] == object2.position[1];
}

export function isObjectPosition(object, x, y ){
    return object.position[0] == x && object.position[1] == y;
}


function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

