var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dca91wshh',
  api_key: '672294945486371',
  api_secret: 'xnO_9xjLJeVnLY5QWlb86H6xT9g'
});

var getPhotos = function () {
  console.log('Entered getPhotos function');
  var result = cloudinary.v2.api.resources({type: 'upload', prefix: 'test/testDetect'}, callback);
};

var callback = function(err, res) {
  if (err) {
    console.log('Error: ' + err);
  };
  console.log(res.resources[0].public_id);
};

module.exports = {
  getPhotos: getPhotos
};
