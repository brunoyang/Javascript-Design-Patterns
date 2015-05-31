//simple factory
var CarFactory = {
  makeCar: function(features) {
    var car = new Car(),
      featureList = {
        locks: false,
        windows: false,
        ac: false
      };
    if (features && features.length) {
      var i = 0,
        len = features.length;

      for (; i < len; i++) {
        featureList[features[i]] = true;
      }

      if (featureList.windows) {
        car = new Windows(car);
      }

      if (featureList.locks) {
        car = new Locks(car);
      }

      if (featureList.ac) {
        car = new AC(car);
      }
    }
    return car;
  }
};


//standard factory
var CarShop = function() {};

CarShop.prototype = {
  sellCar: function(type, features) {
    var car = this.manufactureCar(type, features);

  },
  decorateCar: function(car, features) {
      var featureList = {
        locks: false,
        windows: false,
        ac: false
      };
    if (features && features.length) {
      var i = 0,
        len = features.length;

      for (; i < len; i++) {
        featureList[features[i]] = true;
      }

      if (featureList.windows) {
        car = new Windows(car);
      }

      if (featureList.locks) {
        car = new Locks(car);
      }

      if (featureList.ac) {
        car = new AC(car);
      }
    }
    return car;
  },
  manufactureCar: function(type, features) {
    throw new Error('manufactureCar必须由子类开实现');
  }
};

var BenzCarShop = function(){};

BenzCarShop.prototype = new CarShop();

BenzCarShop.prototype.manufactureCar = function(type, features){
  var car;
  switch(type){
    case 'sl500':
      car = new Car();
      break;
  }
  return this.decorateCar(car, features);
};