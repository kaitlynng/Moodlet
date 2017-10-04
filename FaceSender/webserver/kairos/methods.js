var methods = methods || {};
var app_id = 'f255048b',
    app_key = '9320ca4b9ef00594b197253a55856d16';
var Kairos = require('./kairos');

auth = {
  init: function() {
    $('#methods').hide();
    console.log('Entered auth function');
    this.kairos = new Kairos(app_id, app_key);
    console.log('Created this.kairos');
    this.kairos.checkAuthentication(function(callback) {
      if (callback.statusText != 'error') {
        document.getElementById('checkAuth').innerHTML = '<h3>Authenticated!</h3>';
        $('#methods').show();
      } else {
        res.end('Authentication error!');
      }
    });
  };
};

module.exports = {
  auth: auth
};
