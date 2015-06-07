(function() {
  function _$(els) {
    this.elements = [];
    for (var i = 0, len = els.length; i < len; i++) {
      var ele = els[i];
      if (typeof ele === 'string') {
        ele = document.getElementById(ele);
      }
      this.elements.push(ele);
    }
  }

  _$.prototype = {
    each: function(cb) {
      for (var i = 0, len = this.elements.length; i < len; i++) {
        cb.call(this, this.elements[i]);
      }
      return this;
    },
    css: function(arg) {
      if (arguments.length === 2) {
        this.each(function(el) {
          el.style[arguments[0]] = arguments[1];
        });
      } else if (arguments.length === 1) {
        for (var prop in arg) {

          this.each(function(el) {
            console.log(prop);
          console.log(arg[prop]);
          console.log(this);
            el.style[prop] = arg[prop];
          });
        }
      }

      return this;
    },
    show: function() {
      var t = this;
      this.each(function(el) {
        t.setStyle('display', 'block');
      });
      return this;
    },
    on: function(type, cb) {
      var add = function(el) {
        if (window.addEventListener) {
          el.addEventListener(type, cb, false);
        } else if (window.attachEvent) {
          el.attachEvent('on' + type, cb);
        }
      };
      this.each(function(el) {
        add(el);
      });
      return this;
    }
  };

  window.$ = function() {
    return new _$(arguments);
  };
})();

$(window).on('load', function() {
  $('test-1', 'test-2').css({
    'width': '300px',
    'height': '200px',
    'margin': '20px',
    'background': 'lightgreen'
  });
});