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

  app.post('/retrieveCloudinary', function(eventName, req, res) {
    console.log('eventname: ' + eventName);
    console.log('entered retrieveCloudinary');
    var data;
    cloud.getPhotos(eventName).then(function(result) {
        data = result;
        console.log('success!');
        console.log(JSON.stringify(data.resources[0].url));
        return data;
    }).catch(function(err) {
      console.log('Error: ' + JSON.stringify(err));
    });
  });


/*  app.post('/retrieveCloudinary', function(req, res) {
    console.log('entered retrieveCloudinary');
    var data;
    cloud.getPhotos().then(function(result) {
        console.log(JSON.stringify(result.resources[0].url));
        data = result;
    }).catch(function(err) {
      console.log('Error: ' + err)
    });
    return data;
  });

*/
  app.post('/RNRequest', function(params, req, res) {
    console.log('entered RNRequest');
    var result = cloud.RNGetPhotos(params.galleryName, params.eventName);
  })
};
