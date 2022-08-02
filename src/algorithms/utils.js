const inf = 1000000000;

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


export default getWeight;