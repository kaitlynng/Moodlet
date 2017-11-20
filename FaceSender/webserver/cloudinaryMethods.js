var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dca91wshh',
  api_key: '672294945486371',
  api_secret: 'xnO_9xjLJeVnLY5QWlb86H6xT9g'
});

var getPhotos = function (eventName) {
  return new Promise(function(resolve, reject) {
    console.log('event in getPhotos: ' + eventName);
    cloudinary.v2.api.resources({type: 'upload', prefix: 'test/testDetect'}, function(err, result) {
      if (err) {
        console.log('Error!');
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      };
    });
  });
};

var RNGetPhotos = function (galleryName, eventNamw) {
  console.log('Entered RNGetPhotos function');
  var data;
  var foo = function(callback) {
    cloudinary.v2.api.resources({type: 'upload', prefix: 'test/testDetect'}, callback);
  };
  foo(function(result) {
    data = result;
  });
  console.log(data);
  return data;
};

/*
 var callback = function(err, res) {
  if (err) {
    console.log('Error: ' + err);
  };
  console.log(res.resources.length);
  for (i=0; i<res.resources.length; i++) {
    console.log(res.resources[i].url);
  };
};
*/

module.exports = {
  getPhotos: getPhotos
};
