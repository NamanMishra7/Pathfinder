import React from "react";
import Navbar from "./Navbar";
import MainGrid from "./MainGrid";
import dijkstra from "../algorithms/dijkstra";
import RecursiveDivision from "../algorithms/RecursiveDivision";

const spMap = {'Fast': 10, 'Medium': 40, 'Slow': 100};

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
        };
    }

    handleSpeed(type) {
        this.setState({
            speed: type,
        });
    }

    resetBoard(type) {
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
        }
        else if (type == 'clear-path') {
            const table = this.state.table;
            for (let i = 0; i < this.state.maxRow; i++) {
                for (let j = 0; j < this.state.maxCol; j++) {
                    const node = document.getElementById(`${i}-${j}`).className;
                    if (node === 'visited' || node === 'shortest-path') {
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
        const table = this.state.table.slice();
        const maxRow = this.state.maxRow;
        const maxCol = this.state.maxCol;
        if (maze == 'RecursiveDivision')
            RecursiveDivision(table, spMap[this.state.speed]*2);
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
        const table = this.state.table.slice();
        const maxRow = this.state.maxRow;
        const maxCol = this.state.maxCol;
        const s_i = this.state.start_i;
        const s_j = this.state.start_j;
        const e_i = this.state.end_i;
        const e_j = this.state.end_j;
        //console.log(table);
        if (algo === 'dijkstra') {
            //console.log('dijkstra\'s search: start = (' + s_i + ', ' + s_j + ')');
            dijkstra(table, maxRow, maxCol, s_i, s_j, e_i, e_j, spMap[this.state.speed]);
        }
    }

    render() {
        const row = this.state.maxRow;
        const col = this.state.maxCol;
        const table = this.state.table;
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