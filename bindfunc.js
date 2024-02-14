class myClass {
  constructor(params) {
    console.log(params);
  }
}

const myClassBind = myClass.bind(this, {
  apiVersion: "234",
  region: "new region"
});

const variable = new myClassBind({ region: "123" });
