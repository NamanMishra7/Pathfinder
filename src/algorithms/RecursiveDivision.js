import visualizer from "../components/visualizer";

let delay = 20;
let speed = 20;

function RecursiveDivision(table) {
    delay = speed = 20;
    divide(table, 2, table.length-3, 2, table[0].length-3, 'vertical', false);
}

function divide(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls) {
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
    }
    if (!surroundingWalls) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (i === 0 || j === 0 || i === board.length-1 || j === board[0].length-1)
                    visualizer(i, j, 'wall', delay += speed);
            }
        }
        surroundingWalls = true;
    }
    if (orientation === "horizontal") {
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = [];
        for (let number = colStart-1; number <= colEnd+1; number += 2) {
            possibleCols.push(number);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        for (let j = colStart-1; j <= colEnd+1; j++) {
            if (j === colRandom)
                continue;
            let curr_status = document.getElementById(`${currentRow}-${j}`).className;
            if (curr_status === 'start' || curr_status === 'end')
                continue;
            visualizer(currentRow, j, 'wall', delay += speed);
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            divide(board, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
        }
        else {
            divide(board, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingWalls);
        }
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            divide(board, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
        }
        else {
            divide(board, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingWalls);
        }
    }
    else {
        let possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        let possibleRows = [];
        for (let number = rowStart-1; number <= rowEnd+1; number += 2) {
            possibleRows.push(number);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        for (let i = rowStart-1; i <= rowEnd+1; i++) {
            if (i === rowRandom)
                continue;
            let curr_status = document.getElementById(`${i}-${currentCol}`).className;
            if (curr_status === 'start' || curr_status === 'end')
                continue;
            visualizer(i, currentCol, 'wall', delay += speed);
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            divide(board, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingWalls);
        }
        else {
            divide(board, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            divide(board, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingWalls);
        }
        else {
            divide(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
        }
    }
};

export default RecursiveDivision;