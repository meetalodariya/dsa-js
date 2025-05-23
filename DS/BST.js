class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    var newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    var current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }

        current = current.right;
      }
    }
  }
  find(value) {
    if (this.root === null) return false;
    var current = this.root,
      found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current;
  }
  contains(value) {
    if (this.root === null) return false;
    var current = this.root,
      found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }
  levelOrder() {
    if (!this.root) return [];

    const queue = [this.root];
    const data = [];

    while (queue.length) {
      const length = queue.length;
      let count = 0;

      const currentLevelVals = [];

      while (count < length) {
        const currentNode = queue.shift();

        currentLevelVals.push(currentNode.value);
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
        count++;
      }

      data.push(currentLevelVals);
    }

    return data;
  }

  rightSideViewBFS() {
    const levelOrderNodes = this.levelOrder();

    return levelOrderNodes.map((arr) => arr[arr.length - 1]);
  }

  rightSideViewDFS() {
    function dfs(node, currentLevel, result) {
      if (!node) return;

      if (currentLevel >= result.length) {
        result.push(node.value);
      }

      if (node.right) dfs(node.right, currentLevel + 1, result);

      if (node.left) dfs(node.left, currentLevel + 1, result);
    }

    const result = [];

    dfs(this.root, 0, result);

    return result;
  }

  BFS() {
    var node = this.root,
      data = [],
      queue = [];
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }
  DFSPreOrder() {
    var data = [];
    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }
  DFSPostOrder() {
    var data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }
    traverse(this.root);
    return data;
  }
  DFSInOrder() {
    var data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }
  MaxDepth() {
    function traverse(node, count) {
      if (node == null) {
        return count;
      }
      count++;
      return Math.max(traverse(node.left, count), traverse(node.right, count));
    }

    return traverse(this.root, 0);
  }
  validate() {
    const node = this.root;

    function traverse(node, leftBound, rightBound) {
      if (node === null) return true;

      if (leftBound !== null && node.value < leftBound) {
        return false;
      }

      if (rightBound !== null && node.value > rightBound) {
        return false;
      }

      if (node.left) {
        if (!traverse(node.left, leftBound, node.value)) {
          return false;
        }
      }

      if (node.right) {
        if (!traverse(node.right, node.value, rightBound)) {
          return false;
        }
      }

      return true;
    }

    return traverse(node, null, null);
  }
}

var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
tree.insert(13);
tree.insert(18);
tree.insert(120);
tree.insert(11);
tree.insert(7);

console.log(tree.DFSPreOrder());
console.log(tree.BFS());
