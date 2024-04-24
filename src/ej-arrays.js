const arrNumbers = [1,2,3,4,5];
// const arrNumbers = [17,19,21];
// const arrNumbers = [5,5,5];
// const arrNumbers = [0,0];

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