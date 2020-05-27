function forEach(array, func) {
  if(!Array.isArray(array))
    throw new Error('Parameter type is not array');

  for (let i = 0; i < array.length; i++)
    func(array[i], i, array);
}

function map(array, func) {
  if(!Array.isArray(array))
    throw new Error('Parameter type is not array');

  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(func(array[i], i, array));
  }
  return newArray;
}

function filter(array, func) {
  if(!Array.isArray(array))
    throw new Error('Parameter type is not array');

  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if(func(array[i], i, array))
      newArray.push(array[i]);
  }
  return newArray;
}

function reduce(array, func, acc) {
  if(!Array.isArray(array))
    throw new Error('Parameter type is not array');

  let i = 0;
  if(typeof acc === 'undefined') {
    acc = array[0];
    i = 1;
  }

  for (i; i < array.length; i++)
    acc = func(acc, array[i], i, array);

  return acc;
}

function every(array, func) {
  if(!Array.isArray(array))
    throw new Error('Parameter type is not array');

  for (let i = 0; i < array.length; i++) {
    if(func(array[i], i, array) === false)
      return false;
  }

  return true;
}

function some(array, func) {
  if(!Array.isArray(array))
    throw new Error('Parameter type is not array');

  for (let i = 0; i < array.length; i++) {
    if(func(array[i], i, array) === true)
      return true;
  }

  return false;
}
