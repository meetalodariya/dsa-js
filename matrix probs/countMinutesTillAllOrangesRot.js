const directions = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], //down
  [0, -1], // left
];

const countMinutesTillAllOrangesRot = (matrix) => {
  let freshOrangeCount = 0;
  let minutesCount = 0;

  const queue = [];

  // O(n)
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        freshOrangeCount++;
      } else if (matrix[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    const queueLength = queue.length;
    let count = 0;
    let changed = false;

    while (count < queueLength) {
      const [row, col] = queue.shift();
      count++;

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

        changed = true;
        freshOrangeCount--;
        matrix[elementRow][elementCol] = 2;
        queue.push([elementRow, elementCol]);
      }
    }

    if (changed) {
      minutesCount++;
    }
  }

  if (freshOrangeCount) {
    return -1;
  }

  return minutesCount;
};

const mat = [
  [2, 1, 1, 0, 1],
  [0, 0, 1, 0, 1],
  [0, 0, 1, 0, 1],
  [0, 0, 1, 1, 1],
];

console.log(countMinutesTillAllOrangesRot(mat));
