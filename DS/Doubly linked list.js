class Node {
  constructor(val, child = null) {
    this.val = val;
    this.next = null;
    this.prev = null;
    this.child = child && child.head;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val, child) {
    var newNode = new Node(val, child);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (!this.head) return undefined;
    var poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }
  shift() {
    if (this.length === 0) return undefined;
    var oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }
  unshift(val, child) {
    var newNode = new Node(val, child);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    var count, current;
    if (index <= this.length / 2) {
      count = 0;
      current = this.head;
      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      count = this.length - 1;
      current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }
  set(index, val) {
    var foundNode = this.get(index);
    if (foundNode != null) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  insert(index, val, child) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);

    var newNode = new Node(val, child);
    var beforeNode = this.get(index - 1);
    var afterNode = beforeNode.next;

    (beforeNode.next = newNode), (newNode.prev = beforeNode);
    (newNode.next = afterNode), (afterNode.prev = newNode);
    this.length++;
    return true;
  }
  flatten() {
    let currentNode = this.head;

    while (currentNode.next !== null) {
      if (currentNode.child) {
        const nextNode = currentNode.next;

        let childNode = currentNode.child;
        //  childNode's head
        this.length++;

        while (childNode.next !== null) {
          childNode = childNode.next;

          // rest of the nodes in child
          this.length++;
        }

        // merge the entire child linked list
        nextNode.prev = childNode;
        childNode.next = nextNode;
        currentNode.next = currentNode.child;
        currentNode.child.prev = currentNode;
        currentNode.child = null;
      }

      currentNode = currentNode.next;
    }
  }
}

var nestedList = new DoublyLinkedList();
nestedList.push(10);
nestedList.push(11);

var childList = new DoublyLinkedList();
childList.push(7);
childList.push(8, nestedList);
childList.push(9);

var childList2 = new DoublyLinkedList();
childList2.push(12);
childList2.push(13);

var list = new DoublyLinkedList();
list.push(1);
list.push(2, childList);
list.push(3);
list.push(4);
list.push(5, childList2);
list.push(6);

list.flatten();

console.log(list);
