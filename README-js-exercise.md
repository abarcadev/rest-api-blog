# JS exercise: Array of integers

## Code
```js
const arrNumbers = [1,2,3,4,5];

const total = arrNumbers.reduce((acum, cur) => {
  if (isNaN(cur))
    throw 'Error with array element';

  if (cur % 2 === 0) {
    acum += 1;
  } else {
    acum += (cur === 5) ? 5 : 3;
  }

  return acum;
}, 0);

console.log('Total score:', total);
```

## Try it out
1. Check src/ej-arrays.js file.
2. Run:
```
node src/ej-arrays.js
```