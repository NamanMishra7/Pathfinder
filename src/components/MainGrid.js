import React from "react";
import Table from "./Table";

class MainGrid extends React.Component {
    render() {
        return (
            <div className="MainGrid">
                <div className="legend">
                    legend...
                </div>
                <Table maxRow={this.props.maxRow} maxCol={this.props.maxCol} table={this.props.table} onClick={(i, j) => this.props.onCellClick(i, j)}/>
            </div>
            
        );
    }
}

export default MainGrid;