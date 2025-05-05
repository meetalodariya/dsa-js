const traversalBFS = (adjList, startingVertex) => {
  const queue = [startingVertex];
  const seen = {};
  const values = [];

  while (queue.length) {
    const vertex = queue.shift();

    if (seen[vertex]) {
      continue;
    }
    values.push(vertex);
    seen[vertex] = true;

    const connections = adjList[vertex];

    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];

      if (!seen[connection]) {
        queue.push(connection);
      }
    }
  }

  return values;
};

const adjacencyList = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "E"],
  D: ["B", "E", "F"],
  E: ["C", "D", "F"],
  F: ["D", "E"],
};

console.log(traversalBFS(adjacencyList, "A"));
