import visualizer from "../components/visualizer";
import {getWeight} from "./utils";

let speed = 10;
let delay = 10;
let pathspeed = 50;

let nodes_visited = 0;
let path_length = 0;
let cost = 0;
let success = false;

class Cell {
    constructor(parent = null, position = null) {
        this.parent = parent;
        this.position = position;
    }
}

function bfs(table, maxRow, maxCol, start_i, start_j, end_i, end_j, sp) {
    nodes_visited = 0;
    path_length = 0;
    cost = 0;
    success = false;
    speed = delay = sp;
    pathspeed = 50;

    let q = [];
    let vis = [];
    for (let i = 0; i < maxRow; i++) {
        let tmp = [];
        for (let j = 0; j < maxCol; j++) {
            tmp.push(false);
        }
        vis.push(tmp);
    }
    let startCell = new Cell(null, {i: start_i, j: start_j});
    q.push(startCell);
    vis[startCell.position.i][startCell.position.j] = true;
    let dx = [-1, 0, 1, 0];
    let dy = [0, 1, 0, -1];
    while (q.length) {
        let currentCell = q.shift();
        nodes_visited++;
        if (currentCell.position.i === end_i && currentCell.position.j === end_j) {
            success = true;
            table[currentCell.position.i][currentCell.position.j].status = 'endVisited';
            visualizer(currentCell.position.i, currentCell.position.j, 'endVisited', delay += speed);
            genPath(currentCell, table);
            break;
        }
        else if (currentCell.position.i === start_i && currentCell.position.j === start_j) {
            table[currentCell.position.i][currentCell.position.j].status = 'startVisited';
            visualizer(currentCell.position.i, currentCell.position.j, 'startVisited', delay += speed);
        }
        else if (document.getElementById(`${currentCell.position.i}-${currentCell.position.j}`).className === "unvisited weight") {
            table[currentCell.position.i][currentCell.position.j].status = 'visited weight';
            visualizer(currentCell.position.i, currentCell.position.j, 'visited weight', delay += speed);
        }
        else {
            table[currentCell.position.i][currentCell.position.j].status = 'visited';
            visualizer(currentCell.position.i, currentCell.position.j, 'visited', delay += speed);
        }

        for (let i = 0; i < 4; i++) {
            let x = currentCell.position.i+dx[i];
            let y = currentCell.position.j+dy[i];
            if (x < 0 || x >= maxRow || y < 0 || y >= maxCol || vis[x][y]) {
                continue;
            }
            const status = document.getElementById(`${x}-${y}`).className;
            if (status === 'wall')
                continue;
            let child = new Cell(currentCell, {i: x, j: y});
            q.push(child);
            vis[x][y] = true;
        }
    }
    return [success, nodes_visited, path_length, cost];
}

function genPath(cell, table) {
    let x = cell.position.i;
    let y = cell.position.j;
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

export default bfs;