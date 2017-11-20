var Express = require('express');
var App = Express();
var bodyParser = require('body-parser');

/* var WebSocketServer = require('websocket').server;
var server = require('http').Server();
server.listen(1337);

wsServer = new WebSocketServer({
  httpServer: server
});

*/
require('./routes')(App);

App.use(bodyParser.urlencoded());
App.use(Express.static(__dirname + '/public'));
App.listen(process.env.PORT || 3000, function() {
  console.log('Server up!')
});
