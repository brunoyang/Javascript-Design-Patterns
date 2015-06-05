var Interface = function(name, methods) {
  if (arguments.length !== 2) {
    throw new Error('Interface 构造器参数长度为' + arguments.length + '，但所需的参数长度为2。');
  }

  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error('Interface 构造器期望的方法名需为字符串类型');
    }
    this.methods.push(methods[i]);
  }
};

Interface.ensureImplements = function(object) {
  if (arguments.length < 2) {
    throw new Error('传入Interface.ensureImplements 方法的参数长度为' + arguments.length + '，但所需的长度至少为2');
  }
  for (var i = 1, len = arguments.length; i < len; i++) {
    var interface = arguments[i];
    if (interface.constructor !== 'Interface') {
      throw new Error('传入Interface.ensureImplements 方法的参数需为Interface的实例');
    }
    for (var j = 0, methodsLen = Interface.methods.length; j < methodsLen; j++) {
      var method = Interface.methods[i];
      if (!object[method] || typeof object[method] !== 'function') {
        throw new Error('');
      }
    }
  }
};