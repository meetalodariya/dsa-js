const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], //down
  [0, -1], // left
];

const countNumberOfGatesToClosestGate = (matrix) => {
  const queue = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        queue.push({ index: [i, j], count: 0 });
      }
    }
  }

  while (queue.length) {
    const { index, count } = queue.shift();
    const [row, col] = index;

    if (matrix[row][col] > count) {
      matrix[row][col] = count;
    }

    for (let k = 0; k < directions.length; k++) {
      const dir = directions[k];

      const elementRow = row + dir[0];
      const elementCol = col + dir[1];

      if (
        elementCol < 0 ||
        elementRow < 0 ||
        elementCol > matrix[0].length - 1 ||
        elementRow > matrix.length - 1 ||
        matrix[elementRow][elementCol] < count + 1 ||
        matrix[elementRow][elementCol] === -1
      ) {
        continue;
      }

      queue.push({ index: [elementRow, elementCol], count: count + 1 });
    }
  }

  return matrix;
};

const mat = [
  [Infinity, -1, 0, Infinity],
  [-1, Infinity, Infinity, -1],
  [Infinity, -1, Infinity, -1],
  [0, -1, Infinity, Infinity],
];

console.log(countNumberOfGatesToClosestGate(mat));
