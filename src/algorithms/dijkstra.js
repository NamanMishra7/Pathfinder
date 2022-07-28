import PriorityQueue from "./PriorityQueue";
import visualizer from "../components/visualizer";

const inf = 1000000000;

let delay = 10;
let speed = 10;

function genPath(table, parent, x, y) {
    if (parent[x][y][0] !== -1) {
        genPath(table, parent, parent[x][y][0], parent[x][y][1]);
    }
    else {
        return;
    }
    table[x][y].status = 'shortest-path';
    visualizer(x, y, table[x][y].status, delay += speed*2);
}

function dijkstra(table, maxRow, maxCol, start_i, start_j, end_i, end_j, sp) {
    delay = speed = sp;
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
                if (x === end_i && y === end_j) {
                    flag = true;
                    break;
                }
                table[x][y].status = 'visited';
                visualizer(x, y, table[x][y].status, delay += speed);
            }
        }
        if (flag)
            break;
    }

    if (flag)
        genPath(table, parent, parent[end_i][end_j][0], parent[end_i][end_j][1]);
}

function getWeight(node_type) {
    switch (node_type) {
        case 'wall':
            return inf;
        case 'start':
        case 'end':
        case 'unvisited':
            return 1;
        default:
            return inf;
    }
}

export default dijkstra;