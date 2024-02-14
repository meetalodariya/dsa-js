// Original Solution
function binarySearch(arr, elem) {
  var start = 0;
  var end = arr.length - 1;
  var middle = Math.floor((start + end) / 2);
  while (arr[middle] !== elem && start <= end) {
    if (elem < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  if (arr[middle] === elem) {
    return middle;
  }
  return -1;
}

// Refactored Version
function binarySearch2(arr, elem, startIdx, endIdx) {
  var start = startIdx || 0;
  var end = endIdx || arr.length - 1;
  var middle;
  while (start <= end) {
    middle = Math.floor((start + end) / 2);

    if (arr[middle] === elem) {
      return middle;
    } else if (arr[middle] < elem) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return -1;
}

binarySearch([2, 5, 6, 9, 13, 15, 28, 30], 103);

module.exports = {
  binarySearch2,
};
