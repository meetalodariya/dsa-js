function minImbalance(fragility, k) {
  const n = fragility.length;
  const size = n - k;

  // Step 1: Sort fragility values
  fragility.sort((a, b) => a - b);

  // Step 2: Compute adjacent differences
  const diffs = new Array(n - 1);
  for (let i = 0; i < n - 1; i++) {
    diffs[i] = fragility[i + 1] - fragility[i];
  }

  // Step 3: Sliding window max with monotonic deque
  const windowSize = size - 1;
  const deque = [];
  let minImbalance = Infinity;

  for (let i = 0; i < diffs.length; i++) {
    // Remove indices that are out of the window
    while (deque.length && deque[0] <= i - windowSize) {
      deque.shift();
    }

    // Maintain decreasing order in deque
    while (deque.length && diffs[deque[deque.length - 1]] <= diffs[i]) {
      deque.pop();
    }

    deque.push(i);

    // Window is fully formed
    if (i >= windowSize - 1) {
      minImbalance = Math.min(minImbalance, diffs[deque[0]]);
    }
  }

  return minImbalance;
}
