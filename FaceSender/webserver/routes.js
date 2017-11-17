var db = require('./database');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/main.html');
  });

  app.post('/upload', function(req, res) {
    db.upload(req, res, function(err) {
      if (err) {
        return res.end('Something went wrong');
      };
      return res.end('Uploaded successfully');
    });
  });
};
