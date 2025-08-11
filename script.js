let puzzle = [
    [0, 0, 0, 0, 5, 1, 0, 0, 0],
    [0, 0, 2, 3, 0, 0, 1, 0, 9],
    [0, 0, 1, 9, 8, 2, 3, 0, 0],
    [0, 8, 4, 0, 3, 7, 0, 0, 0],
    [0, 6, 0, 0, 4, 0, 0, 7, 0],
    [9, 0, 0, 0, 0, 0, 4, 0, 0],
    [2, 0, 0, 5, 0, 0, 6, 0, 0],
    [0, 4, 0, 0, 2, 0, 0, 9, 0],
    [0, 0, 0, 1, 0, 0, 0, 4, 0]
];

function createEditableTable(puzzle) {
    let table = "<table>";
    for (let row = 0; row < 9; row++) {
        table += "<tr>";
        for (let col = 0; col < 9; col++) {
            let val = puzzle[row][col] === 0 ? "" : puzzle[row][col];
            table += `<td><input type="number" min="1" max="9" value="${val}" id="cell-${row}-${col}"></td>`;
        }
        table += "</tr>";
    }
    table += "</table>";
    return table;
}

function createStaticTable(puzzle) {
    let table = "<table>";
    for (let row = 0; row < 9; row++) {
        table += "<tr>";
        for (let col = 0; col < 9; col++) {
            table += `<td>${puzzle[row][col] || ""}</td>`;
        }
        table += "</tr>";
    }
    table += "</table>";
    return table;
}

function valid(puzzle, row, col, value) {
    for (let i = 0; i < 9; i++) {
        if (puzzle[row][i] === value) return false;
    }
    for (let i = 0; i < 9; i++) {
        if (puzzle[i][col] === value) return false;
    }
    let r = row - (row % 3);
    let c = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (puzzle[r + i][c + j] === value) return false;
        }
    }
    return true;
}

function solve(puzzle, row = 0, col = 0) {
    if (col === 9) {
        if (row === 8) return true;
        row++;
        col = 0;
    }
    if (puzzle[row][col] > 0) {
        return solve(puzzle, row, col + 1);
    }
    for (let i = 1; i <= 9; i++) {
        if (valid(puzzle, row, col, i)) {
            puzzle[row][col] = i;
            if (solve(puzzle, row, col + 1)) return true;
            puzzle[row][col] = 0;
        }
    }
    return false;
}

function getGridFromInputs() {
    let grid = [];
    for (let row = 0; row < 9; row++) {
        let rowData = [];
        for (let col = 0; col < 9; col++) {
            let val = document.getElementById(`cell-${row}-${col}`).value;
            rowData.push(val ? parseInt(val) : 0);
        }
        grid.push(rowData);
    }
    return grid;
}

function solveSudoku() {
    let grid = getGridFromInputs();
    let copy = grid.map(row => row.slice());
    if (solve(copy, 0, 0)) {
        document.getElementById("solution").innerHTML = createStaticTable(copy);
    } else {
        document.getElementById("solution").innerHTML = "<p>Not solvable</p>";
    }
}

function clearGrid() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).value = "";
        }
    }
    document.getElementById("solution").innerHTML = "";
}

// Render editable grid on load
document.getElementById("inputGrid").innerHTML = createEditableTable(puzzle);