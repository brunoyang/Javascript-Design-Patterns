AjaxHandler = function() {};

AjaxHandler.prototype = {
  request: function(method, url, callback, data) {
    var xhr = this.createXhrObj();

    xhr.onreadyStateChange = function() {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200) {
        callback.success(xhr.responseText, xhr.responseXML);
      } else {
        callback.failure(xhr.status);
      }
    };
    xhr.open(method, url, true);
    if (method.toLowerCase() !== 'post') {
      data = null;
    }
    xhr.send(data);
  },
  createXhrObj: function() {
    var methods = [
      function() {
        return new XMLHttpRequest();
      },
      function() {
        return new ActiveObject('Msxml2.XMLHTTP');
      },
      function() {
        return new ActiveObject('Microsoft.XMLHTTP');
      }
    ];
    for (var i = 0, len = methods.length; i < len; i++) {
      try{
        methods[i]();
      } catch(e){
        continue;
      }
      this.createXhrObj = methods[i];
      return methods[i];
    }
    throw new Error('can not initial xhr');
  }
};