import {getRand} from "./utils";

let Range = 100;

function RandomWeights(table) {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[0].length; j++) {
            const node = document.getElementById(`${i}-${j}`).className;
            if (node === 'unvisited' && getRand(Range) < Range/3.5) {
                table[i][j].status = 'unvisited weight';
                document.getElementById(`${i}-${j}`).className = 'unvisited weight';
            }
        }
    }
}

export default RandomWeights;