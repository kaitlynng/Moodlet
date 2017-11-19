var db = require('./database');
var cloud = require('./cloudinaryMethods');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/main.html');
  });

  app.get('/cloudinarytest', function(req, res) {
    res.sendFile(__dirname + '/views/cloudinarytest.html');
  });

  app.post('/upload', function(req, res) {
    db.upload(req, res, function(err) {
      if (err) {
        return res.end('Something went wrong');
      };
      return res.end('Uploaded successfully');
    });
  });

  app.post('/retrieveCloudinary', function(req, res) {
    console.log('entered retrieveCloudinary');
    var result = cloud.getPhotos();
  });
};
