var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var App = Express();
App.use(bodyParser.json());

var d = new Date();

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./views/photos");
    },
    filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear() + "_" + file.originalname);
    }
    });

var upload = multer({
  storage: Storage
}).array('uploader');

module.exports = {
  upload: upload
};
