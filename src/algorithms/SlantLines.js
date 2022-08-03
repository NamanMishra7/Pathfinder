import {getRand} from "./utils";

function SlantLines(table) {
    let i = getRand(10);
    let j = 0;
    while (i < table.length && j < table[0].length) {
        for (let row = i, col = j; row >= 0 && col < table[0].length; row--, col++) {
            const node = document.getElementById(`${row}-${col}`).className;
            if (node === 'unvisited' && getRand(i) >= i/6) {
                table[row][col].status = 'wall';
                document.getElementById(`${row}-${col}`).className = 'wall';
            }
        }
        i = i+5;
        if (i >= table.length) {
            j += i-table.length+1;
            i = table.length-1;
        }
    }
}

export default SlantLines;