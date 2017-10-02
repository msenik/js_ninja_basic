//compose
function compose(...executers) {
  return function(...params) {
    let result = executers.pop()(...params);
    for (let foo of executers.reverse()) {
      result = foo(result);
    }
    return result;
  };
}
const toUpper = x => x.toUpperCase();
const classyGreeting = (firstName, lastName) =>
  "The name's " + lastName + ", " + firstName + " " + lastName;
compose(toUpper, classyGreeting)("James", "Bond"); //=> "THE NAME'S BOND, JAMES BOND"

// Эквивалентно вызову toUpper(classyGreeting('James', 'Bond'));
