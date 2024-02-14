const twoSum = (arr, target) => {
  if (arr.length < 2) {
    return null;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    const numToFind = target - arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] === numToFind) {
        return [i, j];
      }
    }
  }

  return null;
};

const twoSumOptimized = (arr, target) => {
  if (arr.length < 2) {
    return null;
  }

  const lookup = {};

  for (let i = 0; i < arr.length; i++) {
    if (lookup[arr[i]] !== undefined) {
      return [lookup[arr[i]], i];
    } else {
      const valToFind = target - arr[i];

      lookup[valToFind] = i;
    }
  }

  return null;
};

console.log(twoSumOptimized([1, 3, 4, 9, 2], 11));
