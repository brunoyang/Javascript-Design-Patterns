var RemoteControl = function(tv) {
  this.tv = tv;

  this.on = function() {
    this.tv.on();
  };

  this.off = function() {
    this.tv.off();
  };

  this.setChannel = function() {
    this.tv.setChannel();
  };
};

var PowerControl = function(tv) {
  this.tv = tv;
  this.channel = 0;

  this.setChannel = function(ch) {
    this.channel = ch;
    return this.tv.turnChannel(ch);
  };

  this.prevChannel = function() {
    this.setChannel(this.channel - 1);
  };

  this.nextChannel = function() {
    this.setChannel(this.channel + 1);
  };
};

PowerControl.prototype = new RemoteControl();

var SonyTV = function() {
  this.on = function() {
    return 'On';
  };
  this.off = function() {
    return 'Off';
  };
  this.turnChannel = function(ch) {
    return ch;
  };
};

var sony = new SonyTV(),
  sonyRemote = new PowerControl(sony);

remote = document.getElementById('remote');
tv = document.getElementById('tv');

buttons = remote.getElementsByTagName('button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(e) {
    tv.innerHTML = sonyRemote.setChannel(e.target.innerHTML);
  }, false);
}