// Priority Queue implementation
class PQ {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  peek() {
    return this._heap[0];
  }

  isEmpty() {
    return this._heap.length === 0;
  }

  _parent(idx) {
    return Math.floor((idx - 1) / 2);
  }

  _leftChild(idx) {
    return idx * 2 + 1;
  }

  _rightChild(idx) {
    return idx * 2 + 2;
  }

  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _compare(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  push(value) {
    this._heap.push(value);
    this._siftUp();

    return this.size();
  }

  _siftUp() {
    let nodeIdx = this.size() - 1;

    while (0 < nodeIdx && this._compare(nodeIdx, this._parent(nodeIdx))) {
      this._swap(nodeIdx, this._parent(nodeIdx));
      nodeIdx = this._parent(nodeIdx);
    }
  }

  pop() {
    if (this.size() > 1) {
      this._swap(0, this.size() - 1);
    }

    const poppedValue = this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  _siftDown() {
    let nodeIdx = 0;

    while (
      (this._leftChild(nodeIdx) < this.size() &&
        this._compare(this._leftChild(nodeIdx), nodeIdx)) ||
      (this._rightChild(nodeIdx) < this.size() &&
        this._compare(this._rightChild(nodeIdx), nodeIdx))
    ) {
      const greaterChildIdx =
        this._rightChild(nodeIdx) < this.size() &&
        this._compare(this._rightChild(nodeIdx), this._leftChild(nodeIdx))
          ? this._rightChild(nodeIdx)
          : this._leftChild(nodeIdx);

      this._swap(greaterChildIdx, nodeIdx);
      nodeIdx = greaterChildIdx;
    }
  }
}

const t = [
  [1, 2, 9],
  [1, 4, 2],
  [2, 5, 1],
  [4, 2, 4],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

const networkDelayTimeDjikstra = function (times, N, k)  {
  // Initialize the distances with Infinity.
  const distances = new Array(N+1).fill(Infinity); // O(V)
  const adjList = distances.map(() => []); // O(V)

  // nodes are from 1..n;
  distances[0] = -Infinity;
  distances[k] = 0;

  // prepare the priority queue(minHeap) to take out node with shortest distance.
  const heap = new PQ((a, b) => distances[a] < distances[b]);
  heap.push(k);
  const prev = {};

  // prepare adjacency list.
  // O(E) ; where E represents the edges in the graph.
  for (let i = 0; i < times.length; i++) {
      const [source, target, weight] = times[i];

      adjList[source].push([target, weight]);
      prev[source] = null;
  }

  // While there are values in the heap.
  // traverse the nodes and find out the min distance from given node (k).
  while (!heap.isEmpty()) {
      const currentVertex = heap.pop();
      const adjacent = adjList[currentVertex];
  
      for (let i = 0; i < adjacent.length; i++) {
        const [neighboringVertex, weight] = adjacent[i];

        if (distances[currentVertex] + weight < distances[neighboringVertex]) {
            distances[neighboringVertex] = distances[currentVertex] + weight;
            heap.push(neighboringVertex);
            prev[neighboringVertex] = currentVertex;
        }
      }
  }

  const ans = Math.max(...distances);

  return ans === Infinity ? -1 : ans;
};

const t2 = [
  [1, 4, 2],
  [1, 2, 9],
  [4, 2, -4],
  [2, 5, -3],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

const networkDelayTimeBellmanFord = function (times, N, k) {
  // Initialize the distances with Infinity.
  const distances = new Array(N).fill(Infinity); // O(V)
  distances[k - 1] = 0;

  // Relax edges repeatedly
  for (let i = 0; i < N - 1; i++) {
    let count = 0;

    for (let j = 0; j < times.length; j++) {
      const [source, target, weight] = times[j];

      if (distances[source - 1] + weight < distances[target - 1]) {
        distances[target - 1] = distances[source - 1] + weight;

        // negative cycle detected.
        if (distances[k - 1] < 0) {
          return false;
        }

        count++;
      }
    }

    if (count === 0) break;
  }

  // check if there are any negative cycles.
  for (let j = 0; j < times.length; j++) {
    const [source, target, weight] = times[j];

    // If we can relax the edge then there is a negative cycle.
    if (distances[source - 1] + weight < distances[target - 1]) {
      distances[target - 1] = distances[source - 1] + weight;

      // negative cycle detected.
      return false;
    }
  }

  const ans = Math.max(...distances);

  return ans === Infinity ? -1 : ans;
};

console.log(networkDelayTimeBellmanFord(t2, 5, 1));
