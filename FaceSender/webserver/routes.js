var db = require('./database');
var cloud = require('./cloudinaryMethods');
var sendMail = require('./nodemail.js');

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
    console.log(JSON.stringify(req.body));
    console.log('entered retrieveCloudinary');
    var data;
    cloud.getPhotos(JSON.stringify(req.body)).then(function(result) {
        data = result;
        console.log('success!');
        console.log(JSON.stringify(data.resources[0].url));
        return res.send(data);
    }).catch(function(err) {
      console.log('Error: ' + JSON.stringify(err));
    });
  });

  app.post('/requestfromRN', function(req, res) {
    /* io.sockets.emit('requestfromRN', { data: 'banana'}); */
    return res.send('banana');
  })

  app.post('/sendmail', function(req, res) {
    console.log(req.body);
    data = JSON.parse(req.body);
    sendMail.sendFunc('kaitlyn.nky@gmail.com', 'hello hello', 'http://www.nasa.gov/centers/goddard/images/content/638831main_globe_east_2048.jpg');
    res.send('banana');
  });
};
