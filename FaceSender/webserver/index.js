var Express = require('express');
var App = Express();

require('./routes')(App);

App.use(Express.static(__dirname + '/public'));
App.listen(process.env.PORT || 3000, function() {
  console.log('Server up!')
});
