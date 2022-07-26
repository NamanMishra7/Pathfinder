import React from "react";

class Cell extends React.Component {
    render() {
        const row = this.props.row;
        const col = this.props.col;
        const status = this.props.status;

        return (
            <td id={`${row}-${col}`} className={status} onMouseDown={() => this.props.onClick()}></td>
        );
    }
}

export default Cell;