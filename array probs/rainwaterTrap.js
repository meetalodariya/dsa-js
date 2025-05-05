const calculateAmountOfTrappedWater = (arr) => {
  if (arr.length < 3) {
    return 0;
  }

  let totalTrappedWater = 0; // in blocks

  arr.forEach((elem, idx) => {
    let maxL = 0;
    let maxR = 0;
    let currentHeight = elem;

    for (let i = idx - 1; i >= 0; i--) {
      maxL = Math.max(maxL, arr[i]);
    }

    for (let j = idx + 1; j < arr.length; j++) {
      maxR = Math.max(maxR, arr[j]);
    }

    const trappedWater = Math.min(maxL, maxR) - currentHeight;

    if (trappedWater > 0) {
      totalTrappedWater += trappedWater;
    }
  });

  return totalTrappedWater;
};

const calculateAmountOfTrappedWaterOptimized = (arr) => {
  if (arr.length < 3) {
    return 0;
  }

  let totalTrappedWater = 0; // in blocks

  let maxL = 0;
  let maxR = 0;

  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx !== rightIdx) {
    if (arr[leftIdx] <= arr[rightIdx]) {
      if (maxL > arr[leftIdx]) {
        totalTrappedWater += maxL - arr[leftIdx];
      } else {
        maxL = arr[leftIdx];
      }

      leftIdx++;
    } else {
      if (maxR > arr[rightIdx]) {
        totalTrappedWater += maxR - arr[rightIdx];
      } else {
        maxR = arr[rightIdx];
      }

      rightIdx--;
    }
  }
wh
  return totalTrappedWater;
};

const arr = [0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2];

// console.log(calculateAmountOfTrappedWater(arr));
console.log(calculateAmountOfTrappedWaterOptimized(arr));
