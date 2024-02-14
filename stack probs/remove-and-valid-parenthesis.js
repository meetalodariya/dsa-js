const { Stack } = require("../DS/Stack");

const makeParenthesisValid = (str) => {
  if (str.length === 0) {
    return "";
  }

  str = str.split("");
  const stack = new Stack();

  str.forEach((char, index) => {
    if (char === ")") {
      const val = stack.pop();

      if (val === null) {
        str[index] = "";
      }
    } else if (char === "(") {
      stack.push(index);
    }
  });

  while (stack.size) {
    const index = stack.pop();

    str[index] = "";
  }

  return str.join("");
};

console.log(makeParenthesisValid("((((((("));
