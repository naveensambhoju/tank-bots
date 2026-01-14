
export default function main(mapData, you, opp){
    /*

        mapData = [
{
                type: "you",
                position: [4,1],
                direction: "s",
                diamonds: 4,
                bullets: 3

           },
           {
                type: "opposition",
                position: [0,1],
                direction: "s",
                 diamonds: 4,
                bullets: 3

           },
            {
                type: "bullet",
                position: [3,5],
                direction: null,
           },
            {
                type: "diamond",
                position: [3,5],
                direction: null,
           }
        ]
     */

    var a =  Math.random() < 1 / 3 ? "moving" : Math.random() < 0.5 ? "rotating" : "shooting";

    switch (a){
        case "moving": {
            const options = ["up", "down", "left", "right"];
            return options[Math.floor(Math.random() * options.length)];
        }
        case "rotating": {
            const options = ["rotate-up", "rotate-down", "rotate-left", "rotate-right"];
            return options[Math.floor(Math.random() * options.length)];
        }
        default: {
            const options = ["shoot", "none", "none", "none"];
            return options[Math.floor(Math.random() * options.length)];
        }
    }




    /// up, left right down shoot, none, rotate-up, rotate-left, rotate-right, rotate-down

    return "none";

}