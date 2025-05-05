class Monarchy {
  constructor(monarch) {
    this.monarch = monarch;
    this.monarchy = {
      [monarch]: { issues: [], predecessor: null, alive: true },
    };
  }

  birth(child, parent) {
    if (!this.monarchy[parent]) {
      console.log("parent doesn't exist");
      return null;
    }

    this.monarchy[child] = { issues: [], alive: true, predecessor: parent };
    this.monarchy[parent].issues.push(child);
  }

  death(member) {
    if (!this.monarchy[member]) {
      console.log("member doesn't exist");
      return null;
    }

    this.monarchy[member].alive = false;
  }

  getAllThePredecessorsOf(member) {
    const values = [];
    let predecessor = this.monarchy[member].predecessor;

    while (predecessor !== null) {
      values.push(predecessor);

      predecessor = this.monarchy[predecessor].predecessor;
    }

    return values;
  }

  getOrderOfSuccession() {
    const orderOfSuccession = [];

    const initMember = this.monarchy[this.monarch];
    if (initMember.alive) {
      orderOfSuccession.push(member);
    }

    const traverseTheMonarchy = (member) => {
      for (let i = 0; i < member.issues.length; i++) {
        const issue = member.issues[i];

        if (this.monarchy[issue].alive) {
          orderOfSuccession.push(issue);
        }

        traverseTheMonarchy(this.monarchy[issue]);
      }
    };

    traverseTheMonarchy(initMember);

    return orderOfSuccession;
  }
}

const monarchy = new Monarchy("Jake");

monarchy.birth("Catherine", "Jake");
monarchy.birth("Tom", "Jake");
monarchy.birth("Celine", "Jake");
monarchy.birth("Jane", "Catherine");
monarchy.birth("Mark", "Catherine");
monarchy.birth("Farah", "Jane");
monarchy.birth("Peter", "Celine");
monarchy.death("Jake");
monarchy.death("Jane");
monarchy.death("Celine");

console.log(monarchy.getAllThePredecessorsOf("Farah"));
