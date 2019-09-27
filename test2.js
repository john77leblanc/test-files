const cat = name => ({
    name,
    type: 'Cat',
    run: true
})

const runner = state => ({
    run: () => `${state.name} the ${state.type} can ${state.run ? 'run' : 'not run'}.`
});

const talker = state => ({
    talk: () => state.sound
})

const getData = priv => ({
    get: data => priv[data]
})

const setData = priv => ({
    set: (data, value) => priv[data] = value
})

const meowCat = name => {
    let priv = {
        data: "Hello"
    }

    this.state = {
        __proto__ : cat(name),
        sound : 'Meow',
    }

    this.methods = Object.assign(
        {},
        runner(this.state),
        talker(this.state),
        getData(priv),
        setData(priv)
    );

    return this;
}

let pet = meowCat('Kevin');

console.log(pet.methods.run()); // Kevin the Cat can run
console.log(pet.methods.talk()); // Meow
console.log(pet.methods.get('data')); // Hello
pet.methods.set('data','goodbye');
console.log(pet.methods.get('data')); // Goodbye