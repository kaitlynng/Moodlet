var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var App = Express();
App.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./views/photos");
    },
    filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now + "_" + file.originalname);
    }
    });

var upload = multer({
  storage: Storage
}).array('eventName');

module.exports = {
  upload: upload
};
