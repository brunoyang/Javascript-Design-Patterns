function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superclass = superClass.prototype;
  if (superClass.prototype.constructor === Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
};

extend(Author, Person);

function Author(name, books) {
  Author.superclass.constructor.call(this, name);
  this.books = books;
}


var author = new Author('ok');
var Name = author.getName();