Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
  return this;
};
(function() {
  var rclass = /[\t\r\n\f]/g;
  var rspace = /\s\s+/g;

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

  function handleClass(classList) {
    return classList.trim().replace(rspace, ' ').replace(rclass, ' ');
  }

  window.noConflict = function(interface) {
    window[interface] = function() {
      return new _$(arguments);
    };
  };

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
            el.style[prop] = arg[prop];
          });
        }
      }
      return this;
    },
    addClass: function(classList) {
      var t = this;
      classList = handleClass(classList).split(' ');
      this.each(function(el) {
        var className = el.className;
        for (var i = 0, len = classList.length; i < len; i++) {
          if (!t.hasClass(classList[i])) {
            className += (' ' + classList[i]);
          }
        }
        el.className = className;
      });
      return this;
    },
    removeClass: function(classList) {
      var t = this;
      classList = handleClass(classList).split(' ');
      this.each(function(el) {
        var className = el.className;
        for (var i = 0, len = classList.length; i < len; i++) {
          if (t.hasClass(classList[i])) {
            var clazz = new RegExp(classList[i], 'g');
            className = (' ' + className + ' ').replace(clazz, ' ').trim().replace(rclass, ' ');
          }
        }
        el.className = className;
      });
      return this;
    },
    hasClass: function(className) {
      for (var i = 0, len = this.elements.length; i < len; i++) {
        if ((' ' + this.elements[i].className.replace(rclass, ' ') + ' ').indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
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
    },
    ajax: function() {
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