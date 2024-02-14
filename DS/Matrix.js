const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], //down
  [0, -1], // left
];

function traverseDFS(matrix) {
  const seen = new Array(matrix.length)
    .fill(0)
    .map(() => new Array(matrix[0].length).fill(false));

  const values = [];

  const dfs = (matrix, row, col, seen, values) => {
    if (
      col < 0 ||
      row < 0 ||
      col > matrix[0].length - 1 ||
      row > matrix.length - 1 ||
      seen[row][col]
    )
      return;

    values.push(matrix[row][col]);

    seen[row][col] = true;

    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];

      dfs(matrix, row + dir[0], col + dir[1], seen, values);
    }
  };

  dfs(matrix, 0, 0, seen, values);

  return values;
}

function traverseBFS(matrix) {
  const seen = new Array(matrix.length)
    .fill(0)
    .map(() => new Array(matrix[0].length).fill(false));

  const values = [];

  const queue = [[0, 0]];

  while (queue.length) {
    const currentPos = queue.shift();

    const row = currentPos[0];
    const col = currentPos[1];

    if (
      col < 0 ||
      row < 0 ||
      col > matrix[0].length - 1 ||
      row > matrix.length - 1 ||
      seen[row][col]
    )
      continue;

    seen[row][col] = true;

    values.push(matrix[row][col]);

    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];

      const elementRow = row + dir[0];
      const elementCol = col + dir[1];

      queue.push([elementRow, elementCol]);
    }
  }

  return values;
}

const matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
];

console.log(traverseBFS(matrix));
