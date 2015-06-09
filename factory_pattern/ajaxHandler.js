AjaxHandler = function() {};

AjaxHandler.prototype = {
  request: function(method, url, callback, data) {
    var xhr = this.createXhrObj();

    xhr.onreadystatechange = function() {
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
      try {
        methods[i]();
      } catch (e) {
        continue;
      }
      this.createXhrObj = methods[i];
      return methods[i];
    }
    throw new Error('can not initial xhr');
  }
};

var QueuedHandler = function() {
  this.queue = [];
  this.requestInProgress = false;
  this.retryDelay = 5;
};

extend(QueuedHandler, AjaxHandler);

QueuedHandler.prototype = {
  request: function(method, url, callback, data, override) {
    if (this.requestInProgress && !override) {
      this.queue.push({
        method: method,
        url: url,
        callback: callback,
        data: data
      });
    } else {
      this.requestInProgress = true;
      var xhr = this.createXhrObj();
      var that = this;
      xhr.onreadystatechange = function() {
        if (xhr.status !== 4) {
          return;
        }
        if (xhr.readyState === 200) {
          callback.success(xhr.responseText, xhr.responseXML);
          that.advanceQueue();
        } else {
          callback.failure(xhr.status);
          setTimeout(function() {
            that.request(method, url, callback, data, true);
          }, that.retryDelay * 1000);
        }
      };
      xhr.open(method, url, true);
      if (method.toLowerCase === 'post') {
        data = null;
      }
      xhr.send(data);
    }
  },
  advanceQueue: function() {
    if (this.queue === 0) {
      this.requestInProgress = false;
      return;
    }
    var req = this.queue.shift();
    this.request(req.method, req.url, req.callback, req.data, true);
  }
};

var OfflineHandle = function() {
  this.storedRequests = [];
};
extend(OfflineHandle, AjaxHandler);
OfflineHandle.prototype = {
  request: function(method, url, callback, data) {
    if (XhrManager.isOffline()) {
      this.storedRequests.push({
        method: method,
        url: url,
        callback: callback,
        data: data
      });
    } else {
      this.flushStoredRequests();
      OfflineHandle.superclass.request(method, url, callback, data);
    }
  },
  flushStoredRequests: function() {
    var i = 0,
      len = this.storedRequests.length,
      req;
    for (; i < len; i++) {
      req = this.storedRequests[i];
      OfflineHandle.superclass.request(req.method, req.url, req.callback, req.data);
    }
  }
};

var XhrManager = {
  createXhrHandler: function() {
    var xhr;
    if (this.isOffline()) {
      xhr = new OfflineHandle();
    } else {
      xhr = new AjaxHandler();
    }
    return xhr;
  },
  isOffline: function() {
    var xhr = new AjaxHandler();
    xhr.request('get', 'xxx.php', {
      success: function() {
        return false;
      },
      failure: function() {
        return true;
      }
    });
  }
};