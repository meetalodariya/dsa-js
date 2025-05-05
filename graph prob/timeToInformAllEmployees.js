const getTimeToInformAllEmployees = (n, headID, managers, informTime) => {
  const adjList = [];

  for (let i = 0; i < n; i++) {
    const managerOfEmployee = managers[i];

    if (managerOfEmployee < 0) {
      continue;
    }

    if (adjList[managerOfEmployee]) {
      adjList[managerOfEmployee].push(i);
    } else {
      adjList[managerOfEmployee] = [i];
    }
  }

  function informAllSubordinates(employeeID, timeElapsed) {
    const subordinates = adjList[employeeID];

    if (!subordinates) {
      return timeElapsed;
    }

    let max = 0;
    for (let i = 0; i < subordinates.length; i++) {
      const subordinate = subordinates[i];

      max = Math.max(
        max,
        informAllSubordinates(
          subordinate,
          timeElapsed + informTime[subordinate]
        )
      );
    }

    return max;
  }

  return informAllSubordinates(headID, informTime[headID]);
};

const n = 7;
const headID = 6;
const managers = [1, 2, 3, 4, 5, 6, -1];
const informTime = [0, 6, 5, 4, 3, 2, 1];

console.log(getTimeToInformAllEmployees(n, headID, managers, informTime));
