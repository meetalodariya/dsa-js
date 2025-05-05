const getBiggestContainer = (arr) => {
  if (arr.length < 2) {
    return 0;
  }

  let maxArea = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const area = Math.min(arr[i], arr[j]) * (j - i);

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  return maxArea;
};

const getBiggestContainerOptimized = (arr) => {
  if (arr.length < 2) {
    return 0;
  }

  let maxArea = 0;
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    const area = Math.min(arr[i], arr[j]) * (j - i);

    if (area > maxArea) {
      maxArea = area;
    }

    if (arr[i] <= arr[j]) {
      i++;
    } else {
      j--;
    }
  }

  return maxArea;
};

console.log(getBiggestContainerOptimized([1, 4, 2, 6, 3]));
