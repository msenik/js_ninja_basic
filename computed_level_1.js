/*
function createSmartObject(obj){
    return obj;
}

function defineComputedField(obj, property, targetProperties,getter){
    Object.defineProperty(obj, property, {
        enumerable: true,
        get: function(){
            let [name, surname, patronimic] = targetProperties;
            return getter(this[name],this[surname], this[patronimic]);
        },
        set: function(){
            throw new Error('This property only for reading');
        } 
    });
}

///////////////////////////////
const obj = createSmartObject({
  name: 'Vasya',
  surname: 'Ivanov',
  patronimic: 'Olegovich',
});

defineComputedField(obj, 'fullName', ['name', 'surname', 'patronimic'], (name, surname, patronimic) => {
  return name + ' ' + surname + ' ' + patronimic;
});

console.log(obj.fullName); // Vasya Ivanov Olegovich
obj.surname = 'Petrov';
console.log(obj.fullName); // Vasya Petrov Olegovich
obj.fullName = 'foo' // error


/*------------Solution 2--------------*/
"use strict";
function createSmartObject(obj) {
  return obj;
}

function defineComputedField(obj, property, targetProperties, getter) {
  const hideProperty = "_" + property;

  Object.defineProperties(obj, {
    [hideProperty]: {
      value: getter(...targetProperties.map(v => obj[v])),
      enumerable: false,
      writable: true
    },
    [property]: {
      enumerable: true,
      get: () => {
        return obj[hideProperty];
      },
      set: () => {
        throw new Error("This property only for reading");
      }
    }
  });

  for (let targetProperty of targetProperties) {
    Object.defineProperties(obj, {
      ["_" + targetProperty]: {
        value: obj[targetProperty],
        enumerable: false,
        writable: true
      },
      [targetProperty]: {
        get: () => obj["_" + targetProperty],
        set: v => {
          obj["_" + targetProperty] = v;
          obj[hideProperty] = getter(
            ...targetProperties.map(v => obj["_" + v])
          );
        }
      }
    });
  }
}

///////////////////////////////
const obj = createSmartObject({
  name: "Vasya",
  surname: "Ivanov",
  patronimic: "Olegovich"
});

defineComputedField(
  obj,
  "fullName",
  ["name", "surname", "patronimic"],
  (name, surname, patronimic) => {
    return name + " " + surname + " " + patronimic;
  }
);

console.log(obj.fullName); // Vasya Ivanov Olegovich
obj.surname = "Petrov";
console.log(obj.fullName); // Vasya Petrov Olegovich
obj.fullName = "foo"; // error
