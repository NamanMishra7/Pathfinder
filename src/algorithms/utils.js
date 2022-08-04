const inf = 1000000000;

function getRand(range) {
    return Math.floor(Math.random()*range);
}

function getWeight(node_type) {
    switch (node_type) {
        case 'wall':
            return inf;
        case 'start':
        case 'end':
        case 'unvisited':
            return 1;
        case 'unvisited weight':
            return 8;
        default:
            return inf;
    }
}


export {getRand, getWeight};