class Solution {
  /**
   * @param {string[][]} tickets
   * @return {string[]}
   */
  findItineraryHierholzer(tickets) {
    const adj = new Map();
    const res = [];

    tickets
      .sort()
      .reverse()
      .forEach(([src, dst]) => {
        if (!adj.has(src)) adj.set(src, []);
        adj.get(src).push(dst);
      });

    function dfs(src) {
      while (adj.has(src) && adj.get(src).length > 0) {
        const dst = adj.get(src).pop();
        dfs(dst);
      }

      res.push(src);
    }

    dfs("JFK");

    return res.reverse();
  }
}

findItineraryHierholzer([
  ["JFK", "SFO"],
  ["JFK", "ATL"],
  ["SFO", "ATL"],
  ["ATL", "JFK"],
  ["ATL", "SFO"],
]);
