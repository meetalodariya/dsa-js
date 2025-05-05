const directions = [
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
];

const isOnBoard = (row, col, n) => row > -1 && col > -1 && row < n && col < n;

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbabilityTopDown = (n, k, row, column) => {
  if (k === 0) {
    return 1;
  }
  if (n < 3) {
    return 0;
  }

  const cache = {};

  const probabilityOf = (i, j, move) => {
    if (cache[`${i}-${j}-${move}`]) {
      return cache[`${i}-${j}-${move}`];
    }

    if (move === 0) return 1;

    let totalProb = 0;

    for (let l = 0; l < directions.length; l++) {
      const [dirRow, dirCol] = directions[l];

      const newRow = dirRow + i;
      const newCol = dirCol + j;

      if (isOnBoard(newRow, newCol, n)) {
        totalProb = totalProb + probabilityOf(newRow, newCol, move - 1) / 8;
      }
    }

    cache[`${i}-${j}-${move}`] = totalProb;

    return totalProb;
  };

  return probabilityOf(row, column, k);
};

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbabilityBottomUp = (n, k, row, column) => {
  prevCache = { [`${row}-${column}`]: 1 };
  currCache = {};

  for (let step = 1; step <= k; step++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let dir = 0; dir < directions.length; dir++) {
          const [r, c] = directions[dir];

          const prevRow = r + i;
          const prevCol = c + j;

          if (isOnBoard(prevRow, prevCol, n)) {
            currCache[`${i}-${j}`] =
              (currCache[`${i}-${j}`] || 0) +
              (prevCache[`${prevRow}-${prevCol}`] || 0) / 8;
          }
        }
      }
    }

    prevCache = currCache;
    currCache = {};
  }

  let res = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res += prevCache[`${i}-${j}`] || 0;
    }
  }

  return res;
};

console.log(knightProbabilityBottomUp(6, 3, 2, 2));
