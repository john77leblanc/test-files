const mammal = (name, type) => ({
    name,
    type,
    run: true
})

const runner = state => ({
    run: () => `${state.name} the ${state.type} can ${state.run ? 'run' : 'not run'}.`
});

const talker = state => ({
    talk: () => state.sound
})

const getData = state => ({
    get: data => state[data]
})

const setData = state => ({
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
        runner(this.state),
        talker(this.state),
        getData(this.state),
        setData(this.state)
    );
}

let pet = animal('Kevin', 'cat');

console.log(pet.run()); // Kevin the Cat can run
console.log(pet.talk()); // Meow
console.log(pet.set('sound','Woof').talk()); // Woof