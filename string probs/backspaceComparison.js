const isTwoStringsEqual = (str1, str2) => {
  if (str1 === str2) {
    return true;
  }

  const typedOutStr1 = buildTypedOut(str1);
  const typedOutStr2 = buildTypedOut(str2);

  if (typedOutStr1.length !== typedOutStr2.length) {
    return false;
  } else {
    for (let i = 0; i < typedOutStr1.length; i++) {
      if (typedOutStr1[i] !== typedOutStr2[i]) return false;
    }
  }

  return true;
};

const buildTypedOut = (str) => {
  let typeOutArray = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "#") {
      typeOutArray.pop();
    } else {
      typeOutArray.push(str[i]);
    }
  }

  return typeOutArray;
};

const isTwoStringsEqualOptimized = (s, t) => {
  if (s === t) {
    return true;
  }

  let str1Idx = s.length - 1;
  let str2Idx = t.length - 1;

  let backspaceCountStr1 = 0;
  let backspaceCountStr2 = 0;

  while (str1Idx >= 0 || str2Idx >= 0) {
    if (s[str1Idx] === "#") {
      backspaceCountStr1++;
      str1Idx--;
    } else if (t[str2Idx] === "#") {
      backspaceCountStr2++;
      str2Idx--;
    } else {
      if (backspaceCountStr1 > 0) {
        backspaceCountStr1--;
        str1Idx--;
        continue;
      }
      if (backspaceCountStr2 > 0) {
        backspaceCountStr2--;
        str2Idx--;
        continue;
      }

      if (s[str1Idx] !== t[str2Idx]) {
        return false;
      } else {
        str1Idx--;
        str2Idx--;
      }
    }
  }

  return true;
};

console.log(isTwoStringsEqualOptimized("abc#d", "abzz##d"));
