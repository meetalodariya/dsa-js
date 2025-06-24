class DSU {
  /**
   * @param {number} n
   */
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(1);
  }

  /**
   * @param {number} node
   * @return {number}
   */
  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  /**
   * @param {number} u
   * @param {number} v
   * @return {boolean}
   */
  union(u, v) {
    let pu = this.find(u);
    let pv = this.find(v);
    if (pu === pv) {
      return false;
    }
    if (this.rank[pv] > this.rank[pu]) {
      [pu, pv] = [pv, pu];
    }
    this.parent[pv] = pu;
    this.rank[pu] += this.rank[pv];
    return true;
  }
}

module.exports = { DSU };
