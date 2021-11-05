//----------------------------------
//  Simplified
//----------------------------------

const simple = () => {
  // Private Data
  this.state = ({
    title: "Hello World",
    lists: [
      {
        id: 1,
        list: [1,2,3]
      },
      {
        id: 2,
        list: [4,5,6]
      }
    ]
  });

  // HTML templates
  this.templates = ({
    holder: () => {
      return `
        <div>
          <h1>Title: ${this.state.title}</h1>
          ${this.state.lists.reduce((sum, list) => sum + this.templates.listHolder(list),"")}
        </di>
      `;
    },
    listHolder: list => {
      return `
        <div>
          <p>List ${list.id}</p>
          <ul>${this.templates.listItems(list.list)}</ul>
        </div>
      `;
    },
    listItems: list => list.reduce((sum, item) => sum + `<li>${item}</li>\n`,"")
  });

  // Public Methods
  return this.methods = ({
    buildHTML: () => this.templates.holder()
  });
}

// console.log(simple().buildHTML());

// Output
//  <div>
//    <h1>Title: Hello World</h1>
//    <div>
//      <p>List 1:</p>
//      <ul>
//        <li>1</li>
//        <li>2</li>
//        <li>3</li>
//      </ul>
//    </div>
//    <div>
//      <p>List 2:</p>
//      <ul>
//        <li>4</li>
//        <li>5</li>
//        <li>6</li>
//      </ul>
//    </div>
//  </div>

//----------------------------------
//  Complex
//----------------------------------

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
  talkThenRun: function() {
    return `${this.talk()}, ${this.run()}`;
  }
});

//----------------------------------
//  Sample object
//  - By returning this.methods, everything else in the object acts as private values
//----------------------------------
const dnd = data => {

  // Target for HTML output
  this.target = document.getElementById("app");

  // Update DOM
  this.update = (target, value) => document.getElementById(target).innerHTML = value;

  // Private object data
  this.state = {
    __proto__: character(data)
  };

  // Static values that do not get changed
  this.static = ({
    key: "value"
  });

  // Accepts a value and returns a modified value
  this.computed = ({
    double: n => n*2,
    nameAndGender: () => `${this.state.name} ${this.state.gender}`
  });

  // Methods that can only be called inside of the object
  this.privateMethods = ({
    reverseList: (l, target = false) => {
      l = l.reverse();
      if (target) this.update(target);
    }
  });

  // Methods to be called publicly
  this.publicMethods = ({
    reverseStrengthsWeaknesses: () => {
      this.privateMethods.reverseList(this.state.strengths);
      this.privateMethods.reverseList(this.state.weaknesses);
    },
    buildHTML: () => this.target.innerHTML = this.templates.mainBox(),
    sample: () => this.target.appendChild(this.templates.sampleBox())
  });

  this.new = e => document.createElement(e);

  this.templates = ({
    sampleBox: () => {
      let box = document.createElement("div");
      box.appendChild(this.templates.element("h1", this.state.name));
      box.appendChild(this.templates.ul(this.state.strengths));
      box.appendChild(this.templates.button({name: "Hello", method: () => alert("Hello")}));
      return box;
    },
    mainBox: () => {
      return `
        <div>
          <p>Name: ${this.state.name}</p>
          <p>Gender: ${this.state.gender}</p>
          <p>Strengths:</p>
          ${this.templates.unorderedList(this.state.strengths, "strength-list")}
          <p>Weaknesses:</p>
          <ul>${this.templates.listItems(this.state.weaknesses)}</ul>
        </div>
      `;
    },
    unorderedList: (list, id) => `<ul id="${id}">${this.templates.listItems(list)}</ul>`,
    listItems: (list, id) => list.reduce((sum, e, i) => sum + `<li id="${id}-${i}">${e}</li>`,""),
    element: (e, text) => {
      let element = this.new(e);
      element.innerHTML = text;
      return element;
    },
    ul: list => {
      let ul = this.new("ul");
      list.forEach((e, i) => ul.appendChild(this.templates.li(e)));
      return ul;
    },
    li: item => {
      let li = this.new("li");
      li.innerHTML = item;
      return li;
    },
    button: data => {
      let button = this.new("button");
      button.innerHTML = data.name;
      button.addEventListener("click", () => data.method());
      return button;
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
    "Hearing",
    "Intelligence"
  ],
  weaknesses: [
    "Memory",
    "Sense of Smell"
  ]
};

let me = dnd(data);

console.log(me.set({name:"Rajon"}).get("name"));
console.log(me.talkThenRun());
me.reverseStrengthsWeaknesses();
// me.buildHTML();
me.sample();