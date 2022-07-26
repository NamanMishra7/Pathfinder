function visualizer(x, y, status, delay){
    setTimeout(() => {
        document.getElementById(`${x}-${y}`).className = status;
    }, delay);
}

export default visualizer;