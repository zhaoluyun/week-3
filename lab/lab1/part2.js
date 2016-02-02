/* =====================
  # Lab 1, Part 2 — Functions as Values

  Functions can be passed as values to other functions. Each exercise here builds on that theme.
===================== */

/* =====================
Instructions: Write a function that *always* returns the number 1.
===================== */

var justOne = function() {
return 1;
};

console.log('justOne success:', justOne() === 1);

/* =====================
Instructions: Write a function that returns true if a number is even.
===================== */

var isEven = function(a) {
if (a%2===0){
  return true;
}
else {
  return false;
}
};

console.log('isEven success:', isEven(2) === true && isEven(3) === false);

/* =====================
Instructions: Write a function that *always* returns false.
              Use functions "justOne" and "isEven" somehow in the definition.
===================== */

var justFalse = function() {
if (justOne()===isEven(2)) {
  return true;
} else {
  return false;
}
};

console.log('justFalse success:', justFalse() === false);

/* =====================
Instructions: Write a function that takes a boolean value and returns its opposite.
===================== */

var not = function(boolean) {
if (boolean===true){
  return false;
} else {
  return true;
}
};

console.log('not success:', not(true) === false);

/* =====================
Instructions: Write a function that returns true if a number is odd
              Use functions "isEven" and "not" somehow in the definition.
===================== */

var isOdd = function(i) {
return not(isEven(i));
};

console.log('isOdd success:', isOdd(4) === false);

/* =====================
Instructions: Write a function that takes a list of numbers and returns a list with only numbers above 10
===================== */

var filterOutLessThan10 = function(array) {
var myArray = [];
for (i=0; i<array.length; i++) {
  if (array[i]>10) {
    myArray.push(array[i]);
  }
}
return myArray;
};

console.log('filterOutLessThan10 success:', filterOutLessThan10([4, 11]).length === 1);

/* =====================
Stretch goal — NOT required
Instructions: Let's bring it all together. Write a function that returns only odd numbers. It takes:
              1. a list of numbers
              2. a function that takes a number and returns true or false (isOdd, let's say)
===================== */

var filter = function(array, func) {
var myArray =[];
for (i=0; i<array.length; i++) {
if (func(array[i]) === true) {
  myArray.push(array[i]);
}
}
return myArray;
};

console.log('filter success:', filter([4, 11], isOdd).length === 1);
