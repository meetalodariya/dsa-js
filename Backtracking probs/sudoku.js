const getBoxId = (row, col) => {
  const rowVal = Math.floor(row / 3) * 3;
  const colVal = Math.floor(col / 3);

  return rowVal + colVal;
};

const isValid = (boxMap, rowMap, colMap, num) => {
  if (boxMap[num] || rowMap[num] || colMap[num]) {
    return false;
  }

  return true;
};

const solveSudoku = (grid) => {
  const rowMap = new Array(grid.length);
  const colMap = new Array(grid.length);
  const boxMap = new Array(grid.length);

  for (let i = 0; i < grid.length; i++) {
    boxMap[i] = {};
    rowMap[i] = {};
    colMap[i] = {};
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const elem = grid[i][j];

      if (elem === ".") continue;

      rowMap[i][elem] = true;
      colMap[j][elem] = true;

      boxMap[getBoxId(i, j)][elem] = true;
    }
  }

  solveBacktrack(grid, boxMap, rowMap, colMap, 0, 0);

  return grid;
};

// backtracking three phases:

// 1. validate
//   2. place the item.
//   3. make a recursive call to next cell
// 4. remove current place
const solveBacktrack = (grid, boxMap, rowMap, colMap, row, col) => {
  // base case
  if (grid.length === row || grid[0].length === col) {
    return true;
  }

  const elem = grid[row][col];

  if (elem === ".") {
    for (let count = 1; count <= grid.length; count++) {
      const numValue = count.toString();
      const rowValues = rowMap[row];
      const colValues = colMap[col];
      const boxValues = boxMap[getBoxId(row, col)];

      if (isValid(boxValues, rowValues, colValues, numValue)) {
        // put item.
        grid[row][col] = numValue;

        rowValues[numValue] = true;
        colValues[numValue] = true;
        boxValues[numValue] = true;

        // move forward
        if (col === grid[0].length - 1) {
          if (solveBacktrack(grid, boxMap, rowMap, colMap, row + 1, 0)) {
            return true;
          }
        } else {
          if (solveBacktrack(grid, boxMap, rowMap, colMap, row, col + 1)) {
            return true;
          }
        }

        // we will only reach here if something did not work down the path of successive calls in call-stack.
        delete rowValues[numValue];
        delete colValues[numValue];
        delete boxValues[numValue];
      }
    }
    // So, we backtrack by clearing up the current place and passing control to the preceding call in call-stack.
    grid[row][col] = ".";
  }
  // if value is already filled then proceed with the next cell in grid.
  else {
    if (col === grid[0].length - 1) {
      return solveBacktrack(grid, boxMap, rowMap, colMap, row + 1, 0);
    } else {
      return solveBacktrack(grid, boxMap, rowMap, colMap, row, col + 1);
    }
  }
};

const emptyGrid = [
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
];

console.log(solveSudoku(emptyGrid));
