function clone(object) {
  function F(){}
  F.prototype = object;
  return new F();
}

var Person = {
  name: 'default name',
  info: {
    age: '10',
    gender: 'male'
  },
  getName: function() {
    return this.name;
  }
};

Person.createInfo = function(){
  return {
    age: '10',
    gender: 'male'
  };
};

var Author = clone(Person);
Author.info = Person.createInfo();
