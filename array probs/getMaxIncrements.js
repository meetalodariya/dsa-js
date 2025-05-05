function getMaxIncrements(ratings) {
  // ratings.sort((a, b) => a -b);
  let maxCount = 0;
  const seen = new Set();

  const backtrack = (path, remaining) => {
    if (remaining.length === 0) {
      // result.push([...path])
      const key = path.join(",");

      if (!seen.has(key)) {
        seen.add(key);

        const newCount = path.reduce((count, current, idx, arr) => {
          if (current < arr[idx + 1] && idx + 1 < arr.length) {
            return count + 1;
          }

          return count;
        }, 0);

        maxCount = Math.max(maxCount, newCount);
      }

      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      const newPath = [...path, remaining[i]];
      const newRemaining = [
        ...remaining.slice(0, i),
        ...remaining.slice(i + 1),
      ];

      backtrack(newPath, newRemaining);
    }
  };

  backtrack([], ratings);

  return maxCount;
}
