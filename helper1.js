"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parent = (function () {
  function parent(key, color) {
    _classCallCheck(this, parent);

    this.key = key;
    this.color = color;
  }

  _createClass(parent, [{
    key: "start",
    value: function start() {
      console.log(this.key + ' and ' + this.color);
    }
  }]);

  return parent;
})();

var key = 1;
var color = "black";
var test = new parent(key, color);
test.start();
