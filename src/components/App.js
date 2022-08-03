import React from "react";
import Navbar from "./Navbar";
import MainGrid from "./MainGrid";
import dijkstra from "../algorithms/dijkstra";
import aStar from "../algorithms/astar";
import RecursiveDivision from "../algorithms/RecursiveDivision";
import RandomMaze from "../algorithms/RandomMaze";
import SlantLines from "../algorithms/SlantLines";

const spMap = {'Fast': 15, 'Medium': 80, 'Slow': 150};

class App extends React.Component {
    constructor(props) {
        super(props);
        const table = createArray(23, 61);
        this.state = {
            maxRow: 23,
            maxCol: 61,
            table: table,
            selected: 'wall',
            start_i: 9,
            start_j: 11,
            end_i: 9,
            end_j: 49,
            algo: 'dijkstra',
            speed: 'Fast',
            success: null,
            nodes_visited: 0,
            path_length: 0,
        };
    }

    handleSpeed(type) {
        this.setState({
            speed: type,
        });
    }

    resetBoard(type) {
        var id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        if (type === 'reset') {
            const table = createArray(this.state.maxRow, this.state.maxCol);
            this.setState({
                table: table,
                start_i: 9,
                start_j: 11,
                end_i: 9,
                end_j: 49,
            });
            for (let i = 0; i < this.state.maxRow; i++) {
                for (let j = 0; j < this.state.maxCol; j++) {
                    if (i === 9 && j === 11) {
                        document.getElementById(`${i}-${j}`).className = 'start';
                    }
                    else if (i === 9 && j === 49) {
                        document.getElementById(`${i}-${j}`).className = 'end';
                    }
                    else {
                        document.getElementById(`${i}-${j}`).className = 'unvisited';
                    }
                }
            }
            document.getElementById(`algo-results`).innerHTML = "";
        }
        else if (type === 'clear-path') {
            const table = this.state.table;
            for (let i = 0; i < this.state.maxRow; i++) {
                for (let j = 0; j < this.state.maxCol; j++) {
                    const node = document.getElementById(`${i}-${j}`).className;
                    if (node === 'visited' || node === 'shortest-path') {
                        document.getElementById(`${i}-${j}`).className = 'unvisited';
                        table[i][j].status = 'unvisited';
                    }
                    else if (node === 'startVisited' || node === 'startTransparent') {
                        document.getElementById(`${i}-${j}`).className = 'start';
                        table[i][j].status = 'start';
                    }
                    else if (node === 'endVisited' || node === 'endTransparent') {
                        document.getElementById(`${i}-${j}`).className = 'end';
                        table[i][j].status = 'end';
                    }
                }
            }
            document.getElementById(`algo-results`).innerHTML = "";
            this.setState({
                table: table,
            });
        }
        else if (type === 'clear-wall') {
            const table = this.state.table;
            for (let i = 0; i < this.state.maxRow; i++) {
                for (let j = 0; j < this.state.maxCol; j++) {
                    const node = document.getElementById(`${i}-${j}`).className;
                    if (node === 'wall') {
                        document.getElementById(`${i}-${j}`).className = 'unvisited';
                        table[i][j].status = 'unvisited';
                    }
                }
            }
            this.setState({
                table: table,
            });
        }
    }

    handleMazeSelect(maze) {
        this.resetBoard('clear-wall');
        this.resetBoard('clear-path');
        const table = this.state.table.slice();
        if (maze === 'RecursiveDivision')
            RecursiveDivision(table);
        else if (maze === 'RandomMaze')
            RandomMaze(table);
        else if (maze === 'SlanLines')
            SlantLines(table);
    }

    handleAlgoSelect(func) {
        this.setState({
            algo: func,
        });
    }

    handleObjectSelect(item) {
        const new_selected = item;
        this.setState({
            selected: new_selected,
        });
    }

    handleCellClick(i, j) {
        const tmp_table = this.state.table.slice();
        const selected = this.state.selected;
        if (selected === "start") {
            tmp_table[this.state.start_i][this.state.start_j].status = 'unvisited';
            this.setState({
                start_i: i,
                start_j: j,
            });
        }
        else if (selected === "end") {
            tmp_table[this.state.end_i][this.state.end_j].status = 'unvisited';
            this.setState({
                end_i: i,
                end_j: j,
            });
        }
        tmp_table[i][j].status = selected;
        this.setState({
            table: tmp_table,
        });
    }

    runAlgo() {
        const algo = this.state.algo;
        const table = this.state.table.slice(0);
        const maxRow = this.state.maxRow;
        const maxCol = this.state.maxCol;
        const s_i = this.state.start_i;
        const s_j = this.state.start_j;
        const e_i = this.state.end_i;
        const e_j = this.state.end_j;

        let success = false;
        let nodes_visited = 0;
        let path_length = 0;
        //console.log(table);
        if (algo === 'dijkstra') {
            //console.log('dijkstra\'s search: start = (' + s_i + ', ' + s_j + ')');
            [success, nodes_visited, path_length] = dijkstra(table, maxRow, maxCol, s_i, s_j, e_i, e_j, spMap[this.state.speed]);
        }
        else if (algo === 'a-star') {
            [success, nodes_visited, path_length] = aStar(table, maxRow, maxCol, s_i, s_j, e_i, e_j, spMap[this.state.speed]);
        }

        document.getElementById(`algo-results`).innerHTML = `<b>Result:</b> ${success? 'Path Found!' : 'No Path Found!'} <span class="visCount">${nodes_visited}</span> cells visited, Path Length is <span class="pathCount">${path_length}</span>!`;
    }

    render() {
        const row = this.state.maxRow;
        const col = this.state.maxCol;
        const table = this.state.table;
        const data = {
            algo: this.state.algo,
        };
        return (
            <div>
                <Navbar 
                    handleObjectSelect={(obj) => this.handleObjectSelect(obj)}
                    handleAlgoSelect={(func) => this.handleAlgoSelect(func)}
                    handleMazeSelect={(maze) => this.handleMazeSelect(maze)}
                    runAlgo={() => this.runAlgo()}
                    reset={(type) => this.resetBoard(type)}
                    speed={this.state.speed}
                    handleSpeed={(type) => this.handleSpeed(type)}
                />
                <MainGrid 
                    consoleData={data}
                    maxRow={row} 
                    maxCol={col} 
                    table={table} 
                    onCellClick={(i, j) => this.handleCellClick(i, j)}  
                />
            </div>
        );
    }
}

function createArray(r, c) {
    let arr = [];
    for (let i = 0; i < r; i++) {
        let tmp = [];
        for (let j = 0; j < c; j++) {
            tmp.push({
                status: 'unvisited',
                weight: 1,
            });
        }
        arr.push(tmp);
    }
    arr[9][11].status = 'start';
    arr[9][49].status = 'end';
    return arr;
}

export default App;