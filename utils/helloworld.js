let a = undefined;
let b = 5;
let c = 10;

let x = a;
let y = b;
let z = c;

console.log(`x: ${x} y: ${y} z: ${z}`)

const commentOne = {
    comment: 'yo',
    value: 10
}

const commentTwo = {
    comment: 'sup'
}

const commentThree = undefined;
const commentFour = undefined;

const c1 = commentOne && commentOne.comment;
const c2 = commentTwo.comment;
// const c3 = commentThree.comment;
const c4 = commentFour && commentFour.comment;
console.log(c1);
console.log(c2);
// console.log(c3);
console.log(c4);
