var Event = {handlers: {}};
Event.on = function(type, handler){
  if(!(type in this.handlers)){
    this.handlers[type] = [];
  }
  this.handlers[type].push(handler);
  return this;
};

Event.emit = function(type){
  var handlerArgs = Array.prototype.slice.call(arguments, 1);
  for(var i = 0, len = this.handlers.length; i < len; i++){
    this.handlers[type][i].call(this, handlerArgs);
  }
  return this;
};