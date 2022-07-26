import React from "react";

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="logo">
                    <a id="refreshButton" className="navbar-brand" href="/#" onClick={() => window.location.reload(true)}>Pathfinder!</a>
                </div>
                <ul className="command-bar">
                    <li id="reset-btn" className="nav-item">
                        <a href="/#" className="nav-link" onClick={() => this.props.reset('reset')}>Reset</a>
                    </li>
                    <li id="object-select-dropdown" className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="menuitem" href="/#" id="navbarDropdownMenuLink-node" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Node
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink-node">
                            <a className="dropdown-item" onClick={() => this.props.handleObjectSelect('wall')} href="/#">Wall</a>
                            <a className="dropdown-item" onClick={() => this.props.handleObjectSelect('unvisited')} href="/#">Empty</a>
                            <a className="dropdown-item" onClick={() => this.props.handleObjectSelect('start')} href="/#">Start</a>
                            <a className="dropdown-item" onClick={() => this.props.handleObjectSelect('end')} href="/#">End</a>
                            <a className="dropdown-item" onClick={() => this.props.handleObjectSelect('unvisited weight')} href="/#">Weight</a>
                        </div>
                    </li>
                    <li id="algo-select-dropdown" className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="menuitem" href="/#" id="navbarDropdownMenuLink-algo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Algorithm
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink-algo">
                            <a className="dropdown-item" onClick={() => this.props.handleAlgoSelect('dijkstra')} href="/#">Dijkstra's Search</a>
                            <a className="dropdown-item" onClick={() => this.props.handleAlgoSelect('a-star')} href="/#">A* Search</a>
                            <a className="dropdown-item" onClick={() => this.props.handleAlgoSelect('bfs')} href="/#">Breadth-First Search</a>
                            <a className="dropdown-item" onClick={() => this.props.handleAlgoSelect('dfs')} href="/#">Depth-First Search</a>
                        </div>
                    </li>
                    <li id="maze-select-dropdown" className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="menuitem" href="/#" id="navbarDropdownMenuLink-maze" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Mazes/Pattern
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink-maze">
                            <a className="dropdown-item" onClick={() => this.props.handleMazeSelect('RecursiveDivision')} href="/#">Recursive Division</a>
                            <a className="dropdown-item" onClick={() => this.props.handleMazeSelect('SlanLines')} href="/#">Slant Lines</a>
                            <a className="dropdown-item" onClick={() => this.props.handleMazeSelect('RandomMaze')} href="/#">Random Maze</a>
                            <a className="dropdown-item" onClick={() => this.props.handleMazeSelect('RandomWeights')} href="/#">Random Weights</a>
                        </div>
                    </li>
                    <li id="start-btn">
                        <button className="btn btn-success" onClick={() => this.props.runAlgo()} type="button">Visualize!</button>
                    </li>
                    <li id="clear-path-btn" className="nav-item">
                        <a href="/#" className="nav-link" onClick={() => this.props.reset('clear-path')}>Clear Path</a>
                    </li>
                    <li id="clear-wall-btn" className="nav-item">
                        <a href="/#" className="nav-link" onClick={() => this.props.reset('clear-wall')}>Clear Walls & Weights</a>
                    </li>
                    <li id="speed-select-dropdown" className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="menuitem" href="/#" id="navbarDropdownMenuLink-speed" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Speed: {`${this.props.speed}`}
                        </a>
                        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink-speed">
                            <a className="dropdown-item" onClick={() => this.props.handleSpeed('Fast')} href="/#">Fast</a>
                            <a className="dropdown-item" onClick={() => this.props.handleSpeed('Medium')} href="/#">Medium</a>
                            <a className="dropdown-item" onClick={() => this.props.handleSpeed('Slow')} href="/#">Slow</a>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;