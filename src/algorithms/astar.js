import visualizer from "../components/visualizer";

let speed = 10;
let delay = 10;
let pathspeed = 50;

class cell {
    constructor(parent = null, position = null) {
        this.parent = parent;
        this.position = position;
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }
}

function aStar(table, maxRow, maxCol, start_i, start_j, end_i, end_j, sp) {
    speed = delay = sp;
    pathspeed = 50;

    let startCell = new cell(null, [start_i, start_j]);
    let endCell = new cell(null, [end_i, end_j]);

    let open_list = [];
    let close_list = [];
    open_list.push(startCell);

    while (open_list.length > 0) {
        let currentCell = open_list[0];
        let currentIndex = 0;
        for (let i = 0; i < open_list.length; i++) {
            if (open_list[i].f <= currentCell.f) {
                currentCell = open_list[i];
                currentIndex = i;
            }
        }
        open_list.splice(currentIndex, 1);
        close_list.push(currentCell);

        if (currentCell.position[0] === endCell.position[0] && currentCell.position[1] === endCell.position[1]) {
            // generate path
            genPath(currentCell.parent, table);
            break;
        }

        if (currentCell.position[0] !== startCell.position[0] || currentCell.position[1] !== startCell.position[1]) {
            console.log(currentCell.position);
            table[currentCell.position[0]][currentCell.position[1]].status = 'visited';
            visualizer(currentCell.position[0], currentCell.position[1], 'visited', delay += speed);
        }

        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];

        for (let i = 0; i < 4; i++) {
            let x = dx[i]+currentCell.position[0];
            let y = dy[i]+currentCell.position[1];
            if (x < 0 || x >= maxRow || y < 0 || y >= maxCol) {
                continue;
            }
            const status = document.getElementById(`${x}-${y}`).className;
            if (status == 'wall')
                continue;
            let f = 1;
            for (let k = 0; k < close_list.length; k++) {
                if (close_list[k].position[0] === x && close_list[k].position[1] === y) {
                    f = 0;
                    break;
                }
            }
            if (f === 0)
                continue;
            
            let newCell = new cell(currentCell, [x, y]);
            newCell.g = currentCell.g+1;
            newCell.h = Math.abs(newCell.position[0]-endCell.position[0])+Math.abs(newCell.position[1]-endCell.position[1]);
            newCell.f = newCell.g+newCell.h;
            for (let j = 0; j < open_list.length; j++) {
                if (open_list[j].position[0] === newCell.position[0] && open_list[j].position[1] === newCell.position[1] && newCell.g > open_list[j].g) {
                    f = 0;
                    break;
                }
            }
            if (f !== 0)
                open_list.push(newCell);
        }
        //console.log(open_list);
    }
}

function genPath(cell, table) {
    let x = cell.position[0];
    let y = cell.position[1];
    if (cell.parent != null) {
        genPath(cell.parent, table);
    }
    else {
        return;
    }
    table[x][y].status = 'shortest-path';
    visualizer(x, y, table[x][y].status, delay += pathspeed);
}

export default aStar;