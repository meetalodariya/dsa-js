const { pivot } = require("../4.1 pivot.js");

const quickSelect = (arr, left, right, idxToFind) => {
  if (left <= right) {
    const partitionIdx = pivot(arr, left, right); // O(n)

    if (partitionIdx === idxToFind) {
      return arr[partitionIdx];
    } else if (partitionIdx > idxToFind) {
      return quickSelect(arr, left, partitionIdx - 1, idxToFind);
    } else {
      return quickSelect(arr, partitionIdx + 1, right, idxToFind);
    }
  }
};

const array = [1, 5, 4, 65, 23, 56, 234, 2, 4, 7, 0];
const k = 4;

console.log(quickSelect(array, 0, array.length - 1, k ));
