import React from "react";
import Table from "./Table";

class MainGrid extends React.Component {
    render() {
        return (
            <div className="MainGrid">
                <nav className="legend">
                    <div className="legend-items" id="algo-name">
                        <b>Current Algorithm:</b> {getAlgoName(this.props.consoleData.algo)}
                    </div>
                    <div className="legend-items" id="algo-results">
                        
                    </div>
                </nav>
                <Table maxRow={this.props.maxRow} maxCol={this.props.maxCol} table={this.props.table} onClick={(i, j) => this.props.onCellClick(i, j)}/>
            </div>
            
        );
    }
}

function getAlgoName(name) {
    if (name === 'dijkstra')
        return "Dijkstra's Search";
    else if (name === 'a-star')
        return "A* Search";
    else if (name === 'bfs')
        return "Breadth-First Search";
    else if (name === 'dfs')
        return "Depth-First Search";
    return "None";
}

export default MainGrid;