const canFinishAllCoursesBFS = (n, prereqList) => {
  const adjList = [];

  for (let i = 0; i < prereqList.length; i++) {
    const [course, dep] = prereqList[i];

    if (Array.isArray(adjList[dep])) {
      adjList[dep].push(course);
    } else {
      adjList[dep] = [course];
    }
  }

  for (let j = 0; j < n; j++) {
    const queue = [];
    const seen = {};

    if (!adjList[j]) continue;

    for (let k = 0; k < adjList[j].length; k++) {
      queue.push(adjList[j][k]);
    }

    while (queue.length) {
      const vertex = queue.shift();

      if (seen[vertex]) {
        continue;
      }

      seen[vertex] = true;

      if (vertex === j) return false;

      const adjacent = adjList[vertex];

      if (!adjacent) continue;

      for (let l = 0; l < adjacent.length; l++) {
        const next = adjacent[l];

        if (!seen[next]) {
          queue.push(next);
        }
      }
    }
  }

  return true;
};

const canFinishAllCoursesTopologicalSort = (n, prereqList) => {
  const adjList = [];
  const inDegrees = new Array(n).fill(0);

  for (let i = 0; i < prereqList.length; i++) {
    const [course, dep] = prereqList[i];

    inDegrees[course]++;

    if (Array.isArray(adjList[dep])) {
      adjList[dep].push(course);
    } else {
      adjList[dep] = [course];
    }
  }

  const stack = [];

  for (let j = 0; j < inDegrees.length; j++) {
    if (inDegrees[j] === 0) {
      stack.push(j);
    }
  }

  let count = 0;
  const output = [];
  while (stack.length) {
    const current = stack.pop();
    count++;

    output.push(current);

    const adjacent = adjList[current];
    if (!adjacent) continue;

    for (let k = 0; k < adjacent.length; k++) {
      const next = adjacent[k];

      inDegrees[next]--;
      if (inDegrees[next] === 0) {
        stack.push(next);
      }
    }
  }

  return count === n ? output : [];
};

// const canFinishAllCoursesTopologicalSortWithoutAdjList = function (
//   n,
//   prerequisites
// ) {
//   const inDegree = new Array(n).fill(0);

//   for (let i = 0; i < prerequisites.length; i++) {
//     inDegree[prerequisites[i][0]]++;
//   }

//   const stack = [];

//   for (let i = 0; i < inDegree.length; i++) {
//     if (inDegree[i] === 0) {
//       stack.push(i);
//     }
//   }

//   let count = 0;

//   while (stack.length) {
//     const current = stack.pop();
//     count++;

//     for (let i = 0; i < prerequisites.length; i++) {
//       const pair = prerequisites[i];
//       if (pair[1] === current) {
//         inDegree[pair[0]]--;
//         if (inDegree[pair[0]] === 0) {
//           stack.push(pair[0]);
//         }
//       }
//     }
//   }

//   return count === n;
// };

const prereq = [
  [1, 0],
  [2, 1],
  [2, 5],
  [0, 3],
  [4, 3],
  [3, 5],
  [4, 5],
];

console.log(
  canFinishAllCoursesTopologicalSort(6, [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [6, 7],
    [7, 2],
  ])
);
