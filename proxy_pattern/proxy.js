var CarList = function(){
};

CarList.prototype = {
  getCar: function(){
    
  }
};

CarListProxy = function(){
  this.carList = null;
};

CarListProxy.prototype = {
  _init: function(){
    if(!this.carList){
      this.carList = new CarList();
    }
  },
  getCar: function(){
    this._init();
    return this.carList.getCar();
  }
};
