import PriorityQueue from "./PriorityQueue";
import visualizer from "../components/visualizer";
import getWeight from "./utils";

const inf = 1000000000;

let delay = 10;
let speed = 10;

let pathspeed = 50;

let nodes_visited = 0;
let path_length = 0;
let success = false;

function genPath(table, parent, x, y) {
    if (parent[x][y][0] !== -1) {
        genPath(table, parent, parent[x][y][0], parent[x][y][1]);
    }
    else {
        table[x][y].status = 'startTransparent';
        visualizer(x, y, table[x][y].status, delay += pathspeed);
        return;
    }
    let status = document.getElementById(`${x}-${y}`).className;
    if (status === 'end') {
        table[x][y].status = 'endTransparent';
    }
    else {
        table[x][y].status = 'shortest-path';
    }
    path_length++;
    visualizer(x, y, table[x][y].status, delay += pathspeed);
}

function dijkstra(table, maxRow, maxCol, start_i, start_j, end_i, end_j, sp) {
    delay = speed = sp;
    pathspeed = 50;
    let dis = [];
    let parent = [];
    for (let i = 0; i < maxRow; i++) {
        let tmp = [];
        let p = [];
        for (let j = 0; j < maxCol; j++) {
            tmp.push(inf);
            p.push([-1, -1]);
        }
        dis.push(tmp);
        parent.push(p);
    }

    let dx = [-1, 0, 1, 0];
    let dy = [0, 1, 0, -1];
    
    let pq = new PriorityQueue();

    pq.enqueue([start_i, start_j], 0);

    dis[start_i][start_j] = 0;

    let flag = false;
    while (!pq.isEmpty()) {
        let node = pq.dequeue();
        if (node.element[0] === start_i && node.element[1] === start_j) {
            table[node.element[0]][node.element[1]].status = 'startVisited';
            visualizer(node.element[0], node.element[1], table[node.element[0]][node.element[1]].status, delay += speed);
        }
        else if (node.element[0] === end_i && node.element[1] === end_j) {
            flag = true;
            success = true;
            table[node.element[0]][node.element[1]].status = 'endVisited';
            visualizer(node.element[0], node.element[1], table[node.element[0]][node.element[1]].status, delay += speed);
            break;
        }
        else {
            table[node.element[0]][node.element[1]].status = 'visited';
            visualizer(node.element[0], node.element[1], table[node.element[0]][node.element[1]].status, delay += speed);
        }
        nodes_visited++;
        for (let i = 0; i < 4; i++) {
            let x = node.element[0]+dx[i];
            let y = node.element[1]+dy[i];
            if (x < 0 || x >= maxRow || y < 0 || y >= maxCol) {
                continue;
            }
            const status = document.getElementById(`${x}-${y}`).className;
            if (status === 'wall')
                continue;
            const weight = getWeight(status);
            if (dis[x][y] > dis[node.element[0]][node.element[1]] + weight) {
                if (dis[x][y] !== inf)
                    pq.erase(node);
                dis[x][y] = dis[node.element[0]][node.element[1]] + weight;
                pq.enqueue([x, y], dis[x][y]);
                parent[x][y][0] = node.element[0];
                parent[x][y][1] = node.element[1];
            }
        }
    }

    if (flag) {
        genPath(table, parent, end_i, end_j);
        document.getElementById(`algo-results`).innerHTML = `Result: ${success? 'Path Found!' : 'No Path Found!'} ${nodes_visited} cells visited, Path Length is ${path_length}`;
    }
}

export default dijkstra;