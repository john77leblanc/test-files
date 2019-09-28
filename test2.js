//-------------------------------
//  Inheritance
//-------------------------------

const mammal = (name, type) => ({
    name,
    type,
    run: true
})

//-------------------------------
//  Composed functions
//-------------------------------

const behaviours = (state) => ({
    talk: () => state.sound,
    run: () => `${state.name} the ${state.type} can ${state.run ? 'run' : 'not run'}.`,
    talkThenRun: function (state) {
        return `${this.talk()}, ${this.run()}`
    }
});

const dataGetSet = state => ({
    get: data => state[data],
    set: (data) => {
        Object.assign(state,data);
        return this.methods;
    }
});

//-------------------------------
//  Animal Object
//  + By returning this.methods, this.state acts as private data
//-------------------------------

const cat = (name) => {
    this.state = {
        __proto__ : mammal(name, 'cat'),
        sound : 'Meow',
    }

    return this.methods = Object.assign(
        {},
        dataGetSet(this.state),
        behaviours(this.state)
    );
}

let pet = cat('Kevin');

console.log(pet.run()); // Kevin the Cat can run
console.log(pet.talk()); // Meow

let newData = {
    sound: 'Woof',
    type: 'dog'
};

console.log(pet.set(newData).talkThenRun()); // Woof, Kevin the dog can run