//memoize
function memoize(foo) {
  let calls = new Map();
  return function(...params) {
    if (calls.has(params)) {
      return calls.get(params);
    } else {
      let result = foo(...params);
      calls.set(params, result);
      return result;
    }
  };
}

function foo(s) {
  console.log("called");
  return s;
}
const memoizedFoo = memoize(foo);
console.log(memoizedFoo(4));
// Вывод:
// called
// 4
console.log(memoizedFoo(5));
// Вывод:
// called
// 45
console.log(memoizedFoo(4));

// Вывод:

// 4
