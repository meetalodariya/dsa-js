const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], //down
  [0, -1], // left
];

const getNumberOfIslands = (matrix) => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        continue;
      }

      // Found a piece of land
      count++;

      // lets find connected pieces of land which forms an island.
      const queue = [[i, j]];

      while (queue.length) {
        const [row, col] = queue.shift();

        if (matrix[row][col] !== 1) continue;

        matrix[row][col] = 0;

        for (let k = 0; k < directions.length; k++) {
          const dir = directions[k];

          const elementRow = row + dir[0];
          const elementCol = col + dir[1];

          if (
            elementCol < 0 ||
            elementRow < 0 ||
            elementCol > matrix[0].length - 1 ||
            elementRow > matrix.length - 1 ||
            matrix[elementRow][elementCol] !== 1
          ) {
            continue;
          }

          queue.push([elementRow, elementCol]);
        }
      }
    }
  }

  return count;
};

// time complexity: O(n + n): O(2n): O(N)
// space complexity: O(min(m, n)): O(n)
const mat = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

console.log(getNumberOfIslands(mat));
