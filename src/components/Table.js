import React from "react";
import Cell from "./Cell";

class Table extends React.Component {
    renderCell(i, j) {
        return (
            <Cell key={`${i}-${j}`} row={i} col={j} status={this.props.table[i][j].status} onClick={() => this.props.onClick(i, j)}/>
        );
    }

    createTable(row, col) {
        let table = [];
        for (let i = 0; i < row; i++) {
            let tmp = [];
            for (let j = 0; j < col; j++) {
                tmp.push(this.renderCell(i, j));
            }
            table.push((<tr key={`row-${i}`} id={`row ${i}`}>{tmp}</tr>));
        }
        return (<table id='board'><tbody>{table}</tbody></table>);
    }

    render() {
        const row = this.props.maxRow;
        const col = this.props.maxCol;

        const tableElement = this.createTable(row, col);

        return (
            tableElement
        );
    }
}

export default Table;