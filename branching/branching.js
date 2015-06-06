var XHRFactory = (function() {
  var standard = {
    createXhrObject: function() {
      return new XMLHttpRequest();
    }
  };

  var activeXNew = {
    createXhrObject: function() {
      return new ActiveXObject('Msxml2.XMLHTTP');
    }
  };

  var activeXOld = {
    createXhrObject: function() {
      return new ActiveXObject('Microsoft.XMLHTTP');
    }
  };
  var testObj;
  try {
    testObj = standard.createXhrObject();
    return standard;
  } catch (e1) {
    try {
      testObj = activeXNew.createXhrObject();
      return activeXNew;
    } catch (e2) {
      try {
        testObj = activeXOld.createXhrObject();
        return activeXOld;
      } catch (e3) {
        throw new Error('无法使用Ajax');
      }
    }
  }
})();

var xhr = XHRFactory.createXhrObject();