var helper = require('./helper.js');
var _ = require('lodash');

var mapped_arr = _.map([1, 2, 3], function(x) {
  return x * 2;
});

console.log(mapped_arr);
