const getLengthOfLongestSubstr = (str) => {
  let lengthOfLongestSubstring = 0;

  loop1: for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const lookup = {
      [char]: true,
    };
    let j;

    loop2: for (j = i + 1; j < str.length; j++) {
      const charCompare = str[j];
      if (!lookup[charCompare]) {
        lookup[charCompare] = true;
      } else {
        break loop2;
      }
    }

    lengthOfLongestSubstring = Math.max(
      Object.keys(lookup).length,
      lengthOfLongestSubstring
    );

    if (j === str.length - 1) {
      break loop1;
    }
  }

  return lengthOfLongestSubstring;
};

const getLengthOfLongestSubstrOptimized = (s) => {
  if (s.length <= 1) return s.length;

  const seen = {};
  let left = 0,
    longest = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    const previouslySeenChar = seen[currentChar];

    if (previouslySeenChar >= left) {
      left = previouslySeenChar + 1;
    }

    seen[currentChar] = right;

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};

//abcbze
//x
//     y

// abcpmsdaaaokn
//          i
//             j
console.log(getLengthOfLongestSubstrOptimized("abcpmsdaaaokn"));
