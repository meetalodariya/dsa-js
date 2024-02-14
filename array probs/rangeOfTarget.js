const { binarySearch2 } = require("../10.1 binary_search.js");

const getRangeOfTheTarget = (arr, target) => {
  const idx = binarySearch2(arr, target, 0, arr.length - 1);
  if (idx > -1) {
    let startPos = idx;
    let endPos = idx;
    let temp1;
    let temp2;

    while (startPos !== -1) {
      temp1 = startPos;
      startPos = binarySearch2(arr, target, 0, startPos - 1);
    }
    console.log(startPos);

    startPos = temp1;

    while (endPos !== -1) {
      temp2 = endPos;
      endPos = binarySearch2(arr, target, endPos + 1, arr.length - 1);
    }
    endPos = temp2;

    return [startPos, endPos];
  }

  return [-1, -1];
};

console.log(getRangeOfTheTarget([1, 2, 3, 4, 4, 4, 4, 4, 4, 5, 6], 4));
