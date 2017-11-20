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

module.exports = {
  getPhotos: getPhotos
};
