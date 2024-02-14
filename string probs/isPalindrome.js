// time complexity: O(n/2) ~ O(n)
// space complexity: O(1)
const isAlmostPalindrome = (str) => {
  if (str.length < 2) {
    return true;
  }

  let mismatchCount = 0;

  str = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  let i = 0;
  let j = str.length - 1;

  while (i < j) {
    if (str[i] !== str[j]) {
      mismatchCount++;
    }

    if (mismatchCount > 1) {
      return false;
    }

    i++;
    j--;
  }

  return true;
};

console.log(isPalindrome("cbasbc"));
