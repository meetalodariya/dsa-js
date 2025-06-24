// First Version
function pivot1(arr, start = 0, end = arr.length + 1) {
  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  var pivot = arr[start];
  var swapIdx = start;

  for (var i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  swap(arr, start, swapIdx);
  return swapIdx;
}

// Version with ES2015 Syntax
function pivot(arr, start = 0, end = arr.length - 1) {

  let pvt = arr[right];
  let p = left;

  for (let i = start; i < end; i++) {
      if (arr[i] <= pvt) {
          [arr[p], arr[i]] = [arr[i], arr[p]];
          p++;
      }
  }
  [arr[p], arr[right]] = [arr[right], arr[p]];

   return  p;       

  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

pivot([4, 8, 2, 1, 5, 7, 6, 3]);

module.exports = {
  pivot,
};
