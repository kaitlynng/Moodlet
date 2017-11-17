// var Kairos = require('./kairos');

checkAuth = {
  init: function () {
    $('#methods').hide();
    this.setActions();
  },
  setActions: function() {
    var self = this;

    $('#btn_enterKeys').click(function(e) { //function to Authenticate Kairos
      e.preventDefault();
      console.log('Entered auth function');
      $('#checkAuth').html("Checking authentication...");
      if ($('#app_id').val() != "" && $('#app_key').val() != "") {
        self.kairos = new Kairos($('#app_id').val(), $('#app_key').val());
        alert('created Kairos object');
        self.kairos.checkAuthentication(function(cb) {
          if (cb.statusText != 'error') {
            $('#checkAuth').html("Authenticated");
            $('#methods').show();
          } else {
            $('#methods').hide();
            alert('Authentication error!');
            console.log('Authentication error');
            $('#checkAuth').html("Authentication Error");
          }
        });
      } else {
        alert('API field is blanks');
        document.getElementById('checkAuth').innerHTML = '<h3>API Keys field is blank!</h3>';
      };
    });

    $('#btn_enroll').click(function() {
      $('#viewData').empty();
      if (self.validate($('#enrollForm')) == true) {
        galleryName = $(enrollForm.gallery_name)
      }

    });

    $('#btnViewSubjectsInGallery').click(function() {
      $('#viewData').empty();

    });
  },

  success_cb: function(data) { //set up callback method?? idek what this means
    $("#viewData").empty();
    $("#viewData").html(data.responseText);
    $("input:text").val("");
    $("input:file").val("");
  }

  validate: function(obj) {
    var isValid = true;
    errorAlert = '';
    var fileUploaded = false;
    if(obj.find('.image-upload').val() != '') {
      fileUploaded = true;
    };
    obj.find('input').each(function() {
      if ($(this).attr('type') == 'text' && $(this).val() == '') {
        isValid = false;
        errorAlert = erroAlert + 'Enter value in ' + $(this).attr('name') + ' pls \n';
      }
    });
    if(isValid == false) {
      alert(errorAlert);
      console.log(errorAlert)
    }
    return isValid;
  }
};

$(document).ready(function() {
  checkAuth.init();
});
