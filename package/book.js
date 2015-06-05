var Book = (function() {
  var constants = {
    'UPPER_BOUND': 100,
    'LOWER_BOUND': -100
  };

  function checkISBN(isbn) {
    if (isbn === undefined || typeof isbn !== 'string') {
      return false;
    }
    isbn = isbn.replace(/-/, '');
    if (isbn.length !== 10 && isbn.length !== 13) {
      return false;
    }
    var sum = 0;
    if (!isbn.match(/^\d{9}/)) {
      return false;
    }
    return true;
  }

  return function(newIsbn, newTitle, newAuthor) {
    var isbn, title, author;
    this.getIsbn = function() {
      return isbn;
    };
    this.setIsbn = function() {
      if (!checkISBN(newIsbn)) {
        throw new Error('Book: Invalid ISBN');
      }
      isbn = newIsbn;
    };
    this.getTitle = function() {
      return title;
    };
    this.setTitle = function() {
      title = newTitle || 'No title';
    };
    this.getAuthor = function() {
      return abthor;
    };
    this.setAuthor = function() {
      author = newAuthor || 'No auhtor';
    };
    this.getConst = function(name) {
      return constants[name];
    };
  };
})();