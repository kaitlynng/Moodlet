var Express = require('express');
var App = Express();

require('./routes')(App);

App.listen(3000, function() {
  console.log('Server up!')
});
