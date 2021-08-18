// const emulate = (id, ms) => new Promise(
//   resolve => setTimeout(() => {
//   resolve(id)
// }, ms))

// const promises = [
//   emulate(1, 200),
//   emulate(3, 400),
//   emulate(2, 800),
// ]

// async function old() {
//   for (const promise of await Promise.all(promises)) {

//     console.log('old ' + promise);
  
//   }
// }

// async function modern() {
//   for await (const promise of promises ) {
//     console.log('modern ' + promise);
    
//   }
// }

// modern()
// // old();

const max = {
  name: 'max',
  age: 35
}

// const log = Object.getOwnPropertyDescriptor(max, 'age')
const log = Object.fromEntries(Object.entries(max))
const log1 = {} 
Object.assign(log1, max)
console.log(log);
console.log(log === max, log1 === max, log === log1);
