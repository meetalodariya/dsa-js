class Character {
  constructor(char) {
    this.char = char;
    this.isEndChar = false;
    this.childKeys = {};
  }
}

class Trie {
  constructor() {
    this.root = new Character("");
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!node.childKeys[char]) {
        node.childKeys[char] = new Character(char);
      }

      if (i === word.length - 1) {
        node.childKeys[char].isEndChar = true;
      }

      node = node.childKeys[char];
    }

    return this;
  }

  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const charNode = node.childKeys[char];

      if (!charNode) {
        return false;
      }

      if (i === word.length - 1) {
        if (charNode.isEndChar) {
          return true;
        }
      }

      node = charNode;
    }

    return false;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      const charNode = node.childKeys[char];

      if (!charNode) {
        return false;
      }

      node = charNode;
    }

    return true;
  }
}

const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("doggy");
trie.insert("my name is Meet Alodariya.");

console.log(trie.startsWith("my name is"));
