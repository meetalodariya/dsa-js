const { Stack } = require("../DS/Stack");

// time: O(n)
// space: O(n/2)
const isValidParenthesis = (str) => {
  if (str.length === 0) {
    return true;
  }

  if (str.length % 2 !== 0) {
    return false;
  }

  const stack = new Stack();

  let i = 0;
  for (; i < str.length / 2; i++) {
    if (["{", "(", "["].includes(str[i])) {
      stack.push(str[i]);
    } else {
      break;
    }
  }

  for (; i < str.length; i++) {
    const bracket = stack.pop();

    if (
      (bracket === "(" && str[i] === ")") ||
      (bracket === "[" && str[i] === "]") ||
      (bracket === "{" && str[i] === "}")
    ) {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

console.log(isValidParenthesisOptimized("[[[]"));
