var Phone = {
  base: {
    addressBook: function(){
      return 'address book function';
    },
    phone: function(){
      return 'call someone';
    }
  },
  web: {
    browser: function(){
      return 'I can surfing in internet';
    }
  }
};
var msg = document.getElementById('phone');

msg.innerHTML = Phone.base.addressBook();