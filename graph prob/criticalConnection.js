var criticalConnections = function (n, connections) {
  const adjList = Array.from({ length: n }, () => Array());
  for (let [u, v] of connections) {
    adjList[u].push(v);
    adjList[v].push(u);
  }
  const visited = Array(n).fill(false);
  let tIn = Array(n).fill(0);
  let tLow = Array(n).fill(0);
  const bridges = [];
  function dfs(node, parent, timer) {
    visited[node] = true;
    tIn[node] = timer;
    tLow[node] = timer;
    for (let adjNode of adjList[node]) {
      if (parent === adjNode) continue;
      if (!visited[adjNode]) {
        dfs(adjNode, node, timer + 1);
        tLow[node] = Math.min(tLow[node], tLow[adjNode]); //upadate the low of node
        if (tLow[adjNode] > tIn[node]) {
          bridges.push([node, adjNode]);
        }
      } else {
        tLow[node] = Math.min(tLow[node], tLow[adjNode]); //upadate the low of node
      }
    }
  }

  dfs(0, -1, 1);

  console.log(tLow);
  console.log(tIn);
  console.log(bridges);

  return bridges;
};

console.log(
  criticalConnections(4, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ])
);
