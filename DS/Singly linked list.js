class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    var current = this.head;
    var newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return undefined;
    var currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }
  unshift(val) {
    var newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    var counter = 0;
    var current = this.head;
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(index, val) {
    var foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);

    var newNode = new Node(val);
    var prev = this.get(index - 1);
    var temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.length++;
    return true;
  }
  //              p    n   ne
  // a -> <- b <- f <- e   d-> c
  // h                        t

  //              p    n
  // a -> <- d <- c    b -> e -> f
  // h                        t
  MtoNreversal(m, n) {
    if (m < 1 || n > this.length || m > n) {
      return false;
    }

    const startNode = this.get(m - 1);
    const endNode = this.get(n - 1);

    const prevNode = this.get(m - 2);
    const nextNode = endNode.next;

    let node = startNode;
    let prev = null;
    let next = null;

    for (let i = 0; i < n - m + 1; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    if (prevNode) {
      prevNode.next = endNode;
    }

    startNode.next = nextNode;

    if (m === 1) {
      this.head = endNode;
    }

    if (n === this.length) {
      this.tail = startNode;
    }

    return this;
  }
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    var previousNode = this.get(index - 1);
    var removed = previousNode.next;
    previousNode.next = removed.next;
    this.length--;
    return removed;
  }

  reverse() {
    var node = this.head;
    this.head = this.tail;
    this.tail = node;
    var next;
    var prev = null;

    // O(n)
    // O(1)
    for (var i = 0; i < this.length; i++) {
      // c
      next = node.next;
      // b
      node.next = prev;
      //b
      prev = node;
      // c
      node = next;
    }

    return this;
  }
  static print(linkedList) {
    var arr = [];
    var current = linkedList.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }

  createCycle(index) {
    if (index < 0 || index > this.length) return false;

    this.tail.next = this.get(index);
  }
}

var list = new SinglyLinkedList();

list.push("a");
list.push("b");
list.push("c");
list.push("d");
list.push("e");
list.push("f");
list.push("g");

// SinglyLinkedList.print(list.reverse());
// SinglyLinkedList.print(list);

module.exports = {
  SinglyLinkedList,
};
