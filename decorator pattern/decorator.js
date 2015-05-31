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

var ACD = function(car){
  CarDecorator.call(this, car);
};

ACD.prototype = new CarDecorator();

ACD.prototype.start = function(){
  this.car.start();
  console.log('打开空调');
};

var car = new Car();

car = new Windows(car);
car = new Locks(car);
car = new ACD(car);

car.start();
car.drive();