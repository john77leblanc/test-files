// Inherited Values
const character = data => Object.assign(
  {
    alive: true,
    strengths: [],
    weaknesses: [],
    run: true
  },
  data
);

// Composed Functions
const getSet = state => ({
  get: data => state[data],
  set: data => {
    Object.assign(state, data);
    return this.methods;
  }
});

const actions = state => ({
  talk: () => state.sound,
  run: () => `${state.name} the ${state.type} can ${state.run ? 'run' : 'not run'}.`,
  talkThenRun: function(state) {
    return `${this.talk()}, ${this.run()}`;
  }
});

//----------------------------------
//  Sample object
//  - By returning this.methods, everything else in the object acts as private values
//----------------------------------
const dnd = data => {

  // Private object data

  this.state = {
    __proto__: character(data)
  };

  // Static values that do not get changed
  this.static = ({
    target: "NAV"
  });

  // Accepts a value and returns a modified value
  this.computed = ({
    double: n => n*2,
    nameAndGender: () => `${this.state.name} ${this.state.gender}`
  });

  // Methods that can only be called inside of the object
  this.privateMethods = ({
    reverseList: l => l = l.reverse()
  });

  // Methods to be called publicly
  this.publicMethods = ({
    reverseStrengthsWeaknesses: () => {
      this.privateMethods.reverseList(this.state.strengths);
      this.privateMethods.reverseList(this.state.weaknesses);
    },
    buildHTML: () => this.templates.mainBox()
  });

  this.templates = ({
    mainBox: () => {
      return `
        <div>
          <p>Name: ${this.state.name}</p>
          <p>Gender: ${this.state.gender}</p>
          <p>Strengths:</p>
          <ul>${this.templates.listItems(this.state.strengths)}</ul>
          <p>Weaknesses:</p>
          <ul>${this.templates.listItems(this.state.weaknesses)}</ul>
        </div>
      `;
    },
    listItems: list => {
      return list.reduce((sum, i) => sum + `<li>${i}</li>`,"");
    }
  });

  // Methods that can be called outside of the object
  return this.methods = Object.assign(
    this.publicMethods,
    getSet(this.state, this.methods),
    actions(this.state)
  );
}

let data = {
  name: "John",
  age: 25,
  gender: "Male",
  sound: "Hello",
  type: "Human",
  strengths: [
    "html",
    "css",
    "javascript"
  ],
  weaknesses: [
    "storyline"
  ]
};

let me = dnd(data);

console.log(me.set({name:"Rajon"}).get("name"));
console.log(me.talkThenRun());
me.reverseStrengthsWeaknesses();
console.log(me.buildHTML());