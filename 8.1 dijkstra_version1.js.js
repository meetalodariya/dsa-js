class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distanceFromOrigin = {};
    const previous = {};
    let path = []; //to return at end
    let smallest;

    nodes.enqueue(start, 0);

    //build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distanceFromOrigin[vertex] = 0;
      } else {
        distanceFromOrigin[vertex] = Infinity;
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      console.log(nodes);

      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        //WE ARE DONE
        //BUILD UP PATH TO RETURN AT END
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      // console.log(smallest);
      if (smallest || distanceFromOrigin[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          //find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          //calculate new distance to neighboring node
          let candidate = distanceFromOrigin[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distanceFromOrigin[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distanceFromOrigin[nextNeighbor] = candidate;
            //updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

var graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("L");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 3);
graph.addEdge("B", "E", 1);
graph.addEdge("C", "F", 5);
graph.addEdge("B", "D", 7);
// graph.addEdge("F", "G", 6);
graph.addEdge("D", "G", 9);
// graph.addEdge("L", "G", 1);
graph.addEdge("E", "L", 1);

console.log(graph.Dijkstra("A", "G"));

// ["A", "C", "D", "F", "E"]
