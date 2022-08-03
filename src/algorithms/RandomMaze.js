import {getRand} from "./utils";

let Range = 100;

function RandomMaze(table) {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
            const node = document.getElementById(`${i}-${j}`).className;
            if (node === 'unvisited' && getRand(Range) < Range/4) {
                table[i][j].status = 'wall';
                document.getElementById(`${i}-${j}`).className = 'wall';
            }
        }
    }
}

export default RandomMaze;