var Phone = {
  base: {
    addressBook: function() {
      return 'address book function';
    },
    phone: function() {
      return 'call someone';
    }
  },
  web: {
    browser: function() {
      return 'I can surfing in internet';
    }
  }
};

Car = (function() {
  var arg = {
    wheel: 4,
    length: 5.1,
    height: 2.2,
    width: 3,
    weight: 2
  };

  var broken = false;

  function isBroken() {
    if (arg.wheel < 4) {
      broken = true;
    }
  }

  isBroken();

  return {
    drive: function() {
      if (!broken) {
        console.log('drive');
      }
    },
    transform: function() {
      console.log('I am a transformer');
    },
    outputArg: function(name) {
      console.log(arg[name]);
    }
  };
})();

var msg = document.getElementById('phone');

msg.innerHTML = Phone.base.addressBook();

var car = Car;