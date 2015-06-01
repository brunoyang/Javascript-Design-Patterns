var LoggerFactory = {
  getLogger: function(){
    return AjaxLoggerAdapter;
  }
};

var AjaxLogger = {
  snedLog: function(log){
    var data = this.urlEncode(log);

    $.ajax({
      url: 'http:',
      data: data
    });
  },
  urlEncode: function(arg){
    return arg;
  }
};

var AjaxLoggerAdapter = {
  log: function(arg){
    AjaxLogger.sendLog(arg);
  }
};

LoggerFactory.getLogger.log('this');