var people = [
    ["John",    "Male",     25],
    ["Josh",    "Male",     35],
    ["Someone", "Female",   24]
];

// Filter gets items with a specific key value
// Map all items with a specific key

var isMale = person => person[1] === "Male";
var males = people.filter(isMale);
console.log("Males", males);

var isFemale = person => person[1] === "Female";
var females = people.filter(isFemale);
console.log("Females", females);

var getName = person => person[0];
var names = people.map(getName);
console.log("Names", names);

var totalAge = people.reduce((sum, line) => sum + line[2],0);
console.log("Total Age", totalAge);

// Currying
var dragons = [
    {name: 'fluffy',    element: 'lightning'},
    {name: 'bob',       element: 'lightning'},
    {name: 'raja',      element: 'fire'},
];

let hasElement = element =>
    obj => obj.element === element;

let lightningDragons = dragons.filter(hasElement('lightning'));
console.log("Lightning Dragons", lightningDragons);

// Recursion
let categories = [
    { id: 'animals', 'parent': null},
    { id: 'mammals', 'parent': 'animals'},
    { id: 'cats', 'parent': 'mammals'},
    { id: 'dogs', 'parent': 'mammals'},
    { id: 'chihuahua', 'parent': 'dogs'},
    { id: 'labrador', 'parent': 'dogs'},
    { id: 'persian', 'parent': 'cats'},
    { id: 'siamese', 'parent': 'cats'},
];

let makeTree = (categories, parent) => {
    let node = {};
    categories
        .filter(c => c.parent === parent)
        .forEach(c => node[c.id] = 
            makeTree(categories, c.id));
    return node;
};

console.log(
    JSON.stringify(
        makeTree(categories, null),
        null,
        2
    )
);

// Promises

function loadImage(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();

        image.onLoad = function() {
            resolve(image);
        }

        image.onerror = function() {
            let message = 'Could not load image at ' + url;
            reject(new Error(message));
        }

        image.src = url;
    });
}

let addImg = (src) => {
    let imgElement = document.createElement("img");
    imgElement.src = src;
    document.body.appendChild(imgElement);
}

Promise.all([
    loadImage('dog.jpg'),
    loadImage('dog.jpg'),
    loadImage('dog.jpg')
]).then((images) => {
    images.forEach(img => addImg(img.src));
}).catch((error) => {
    // Error handling
});


let objects = function() {
    let noa = [];
    axios.get('./test.php').then(res => noa = res.data.map(x => x.line_items[0]));
    return noa;
};