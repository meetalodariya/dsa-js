const getCostOfClimbingStarsTopDown = (arr) => {
  const cache = {};

  const minCostOf = (idx) => {
    if (cache[idx]) return cache[idx];

    if (idx < 0) return 0;

    if (idx === 0 || idx === 1) {
      return arr[idx];
    }

    const ans =
      (arr[idx] || 0) + Math.min(minCostOf(idx - 1), minCostOf(idx - 2));

    cache[idx] = ans;

    return ans;
  };

  return minCostOf(arr.length);
};

const getCostOfClimbingStarsBottomUp = (arr) => {
  let first = arr[0];
  let last = arr[1];

  for (let i = 2; i < arr.length; i++) {
    const current = arr[i] + Math.min(first, last);
    first = last;
    last = current;
  }

  return Math.min(first, last);
};

console.log(getCostOfClimbingStarsBottomUp([20, 15, 30, 5]));
