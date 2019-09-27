const mammal = (name, type) => ({
    name,
    type,
    run: true
})

const behaviours = state => ({
    talk: () => state.sound,
    run: () => `${state.name} the ${state.type} can ${state.run ? 'run' : 'not run'}.`
})

const dataGetSet = state => ({
    get: data => state[data],
    set: (data, value) => {
        state[data] = value;
        return this.methods;
    }
});

const animal = (name, type) => {
    this.state = {
        __proto__ : mammal(name, type),
        sound : 'Meow',
    }

    return this.methods = Object.assign(
        {},
        dataGetSet(this.state),
        behaviours(this.state)
    );
}

let pet = animal('Kevin', 'cat');

console.log(pet.run()); // Kevin the Cat can run
console.log(pet.talk()); // Meow
console.log(pet.set('sound','Woof').talk()); // Woof