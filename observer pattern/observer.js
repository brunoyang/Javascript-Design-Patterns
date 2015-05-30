var Observable = function() {
  this.subscribers = [];
  this.status = 'constructed';
};

Observable.prototype = {
  subscribe: function(cb) {
    this.subscribers.push(cb);
  },
  unsubscribe: function(cb) {
    var i = 0,
      l = this.subscribers.length;

    for (; i < l; i++) {
      if (this.subscribers[i] === cb) {
        this.subscribers.splice(i, 1);
        return;
      }
    }
  },
  publish: function(data) {
    var i = 0,
      l = this.subscribers.length;

    for (; i < l; i++) {
      this.subscribers[i](data);
    }
  },
  getStatus: function() {
    return this.status;
  }
};

var Observer = function() {
  this.subscriptions = [];
};

Observer.prototype = {
  subscribeTo: function(observable){
    this.subscriptions.push(observable);
  },
  unsubscribeFrom: function(observable){
    var i = 0,
      l = this.subscriptions.length;

    for(; i < l; i++){
      if(this.subscriptions[i] === observable){
        this.subscriptions.splice(i, 1);
        return;
      }
    }
  },
  doSomethingIfOk: function(){
    var i = 0,
      l = this.subscriptions.length;

    for(; i < l; i++){
      if(this.subscriptions[i].getStatus === 'ok');
    }
  }
};

var observer = new Observer();
var observable = new Observable();
