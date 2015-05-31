var Car = function() {};

Car.prototype = {
  start: function() {
    console.log('启动啦');
  },
  drive: function() {
    console.log('走起');
  },
  getPrice: function() {
    return 1100;
  }
};

var CarDecorator = function(car) {
  this.car = car;
};

CarDecorator.prototype = {
  start: function() {
    this.car.start();
  },
  drive: function() {
    this.car.drive();
  },
  getPrice: function() {
    return tihs.car.gerPrice();
  }
};

var Locks = function(car) {
  CarDecorator.call(this, car);
};

Locks.prototype = new CarDecorator();

Locks.prototype.drive = function() {
  this.car.drive();
  console.log('车门自动锁死');
};

var Windows = function(car) {
  CarDecorator.call(this, car);
};

Windows.prototype = new CarDecorator();

var AC = function(car){
  CarDecorator.call(this, car);
};

AC.prototype = new CarDecorator();

AC.prototype.start = function(){
  this.car.start();
  console.log('打开空调');
};