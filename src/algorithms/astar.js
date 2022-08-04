import visualizer from "../components/visualizer";
import PriorityQueue from "./PriorityQueue";
import {getWeight} from "./utils"

let speed = 10;
let delay = 10;
let pathspeed = 50;

let nodes_visited = 0;
let path_length = 0;
let cost = 0;
let success = false;

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
    nodes_visited = 0;
    path_length = 0;
    success = false;
    speed = delay = sp;
    pathspeed = 50;

    let startCell = new cell(null, [start_i, start_j]);
    let endCell = new cell(null, [end_i, end_j]);

    let open_list = new PriorityQueue();
    let close_list = [];
    open_list.enqueue(startCell, 0);

    while (!open_list.isEmpty()) {
        let node = open_list.dequeue();
        let currentCell = node.element;
        //console.log('processing: ' + currentCell.position);
        close_list.push(currentCell);

        if (currentCell.position[0] === startCell.position[0] && currentCell.position[1] === startCell.position[1]) {
            table[currentCell.position[0]][currentCell.position[1]].status = 'startVisited';
            visualizer(currentCell.position[0], currentCell.position[1], 'startVisited', delay += speed);
        }
        else if (currentCell.position[0] === endCell.position[0] && currentCell.position[1] === endCell.position[1]) {
            // generate path
            success = true;
            table[currentCell.position[0]][currentCell.position[1]].status = 'endVisited';
            visualizer(currentCell.position[0], currentCell.position[1], 'endVisited', delay += speed);
            genPath(currentCell, table);
            break;
        }
        else if (document.getElementById(`${currentCell.position[0]}-${currentCell.position[1]}`).className === "unvisited weight") {
            table[currentCell.position[0]][currentCell.position[1]].status = 'visited weight';
            visualizer(currentCell.position[0], currentCell.position[1], 'visited weight', delay += speed);
        }
        else {
            table[currentCell.position[0]][currentCell.position[1]].status = 'visited';
            visualizer(currentCell.position[0], currentCell.position[1], 'visited', delay += speed);
        }
        nodes_visited++;

        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];

        for (let i = 0; i < 4; i++) {
            let x = dx[i]+currentCell.position[0];
            let y = dy[i]+currentCell.position[1];
            if (x < 0 || x >= maxRow || y < 0 || y >= maxCol) {
                continue;
            }
            const status = document.getElementById(`${x}-${y}`).className;
            if (status === 'wall')
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
            newCell.g = currentCell.g+getWeight(status);
            newCell.h = Math.abs(newCell.position[0]-endCell.position[0])+Math.abs(newCell.position[1]-endCell.position[1]);
            newCell.f = newCell.g+newCell.h;
            for (let j = 0; j < open_list.items.length; j++) {
                if (open_list.items[j].element.position[0] === newCell.position[0] && open_list.items[j].element.position[1] === newCell.position[1] && newCell.g >= open_list.items[j].element.g) {
                    f = 0;
                    break;
                }
            }
            if (f !== 0) {
                //console.log('added: ' + newCell.position);
                open_list.enqueue(newCell, newCell.f);
            }
        }
    }
    return [success, nodes_visited, path_length, cost];
}

function genPath(cell, table) {
    let x = cell.position[0];
    let y = cell.position[1];
    let status = document.getElementById(`${x}-${y}`).className;
    if (cell.parent != null) {
        genPath(cell.parent, table);
    }
    else {
        table[x][y].status = 'startTransparent';
        visualizer(x, y, table[x][y].status, delay += pathspeed);
        return;
    }
    if (status === 'end') {
        table[x][y].status = 'endTransparent';
    }
    else if (status === 'unvisited weight') {
        table[x][y].status = 'shortest-path weight';
    }
    else {
        table[x][y].status = 'shortest-path';
    }
    cost += getWeight(status);
    path_length++;
    visualizer(x, y, table[x][y].status, delay += pathspeed);
}

export default aStar;