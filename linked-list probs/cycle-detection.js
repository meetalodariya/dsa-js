const { SinglyLinkedList } = require("../DS/Singly linked list");

// h         c
// 1 -> 2 -> 3 -> 4 -> 5
//           ^         v
//           8 <- 7 <- 6
const detectCycles = (linkedList) => {
  let currentNode = linkedList.head;
  const visitedNodes = new Set();

  while (!visitedNodes.has(currentNode)) {
    if (currentNode.next === null) {
      return false;
    }

    visitedNodes.add(currentNode);
    currentNode = currentNode.next;
  }

  return currentNode;
};

const floydsTortoiseAndHareCycleDetection = (linkedList) => {
  let t = linkedList.head;
  let h = linkedList.head;

  while (h !== null && t !== null) {
    if (t === h && t !== linkedList.head) {
      let meetingPoint = t;
      let startPoint = linkedList.head;

      while (startPoint !== meetingPoint) {
        startPoint = startPoint.next;
        meetingPoint = meetingPoint.next;
      }

      return startPoint;
    }

    t = t.next;
    h = h.next && h.next.next;
  }

  return false;
};

const linkedList = new SinglyLinkedList();

linkedList.push(1);
linkedList.push(2);
linkedList.push(3);
linkedList.push(4);
linkedList.push(5);
linkedList.push(6);
linkedList.push(7);
linkedList.push(8);
linkedList.createCycle(5);

console.log(detectCycles(linkedList));
console.log(floydsTortoiseAndHareCycleDetection(linkedList));
