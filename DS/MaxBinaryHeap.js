class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }
  // O(logN)
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (element <= parent) break;

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  // O(logN)
  extractMax() {
    if (this.values.length === 1) {
      return this.values.pop();
    } else if (this.values.length < 1) {
      return undefined;
    }

    const root = this.values[0];

    this.values[0] = this.values.pop();

    let Idx = 0;

    while (true) {
      let elem = this.values[Idx];
      let leftIdx = 2 * Idx + 1;
      let rightIdx = 2 * Idx + 2;
      let leftChild = this.values[leftIdx];
      let rightChild = this.values[rightIdx];

      if (
        (!!leftChild || !!rightChild) &&
        (elem < leftChild || elem < rightChild)
      ) {
        if (rightChild < leftChild) {
          swap(this.values, leftIdx, Idx);
          Idx = leftIdx;
        } else {
          swap(this.values, rightIdx, Idx);
          Idx = rightIdx;
        }
      } else {
        break;
      }
    }

    return root;
  }
}

const swap = (arr, idx1, idx2) =>
  ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);

let heap = new MaxBinaryHeap();

heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
heap.insert(123);
heap.insert(412);
heap.insert(40);
console.log(heap);

heap.extractMax();

console.log(heap);

// console.log(isHeap(heap.values));
