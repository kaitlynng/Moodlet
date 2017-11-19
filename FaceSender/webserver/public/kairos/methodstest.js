// var Kairos = require('./kairos');

cloudinaryFunc = {
  setActions: function() {
    var self = this;
    $('#btn_retrieveCloudinary').click(function(e) {
      e.preventDefault();
      $('#viewData').empty();
      $.post('/retrieveCloudinary', function(data) {
        console.log('successful...?')
        $('#viewData').html(data);
      });
    })
  }
}

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

    $('#btn_enroll').click(function(e) {
      e.preventDefault();
      $('#viewData').empty();
      if (self.validate($('#enrollForm')) == true) {
        galleryName = $('#enrollForm .gallery-name').val();
        subjectId = $('#enrollForm .subject-id').val();
        console.log('validated ' + galleryName + ' ' + subjectId);
        if ($('#enrollForm .image-upload').val() != '') {
          numFiles = $('#enrollForm .image-upload')[0].files.length;
          files = $('#enrollForm .image-upload')[0].files;
          console.log('Number of files: ' + numFiles);
          for (i=0; i < numFiles; i++) {
            (function(file) {
              var name = file.name;
              var reader = new FileReader();
              console.log("file reader for "+ name + " created!");
              reader.readAsDataURL(file);
              reader.onloadend = function () {
                var fileData = parseImageData(reader.result);
                self.kairos.enroll(fileData, galleryName, subjectId, self.success_cb);
              };
            })(files[i]);
          };
        } else {
          console.log('Image not uploaded!');
        }
      } else {
        console.log('validation error!');
      }
    });

    $('#btn_viewSubjectsInGallery').click(function(e) {
      e.preventDefault();
      $('#viewData').empty();
      if (self.validate($('#viewSubjectsInGalleryForm input')) == true) {
        alert('validated');
        galleryName = $('#viewSubjectsInGalleryForm .gallery-name').val();
        console.log('validated ' + galleryName);
        self.kairos.viewSubjectsInGallery(galleryName, self.success_cb);
      };
    });

    $('#btn_recogniseImage').click(function(e) {
      e.preventDefault();
      $('#viewData').empty();
      if (self.validate($('#recogniseImageForm input')) == true) {
        galleryName = $('#recogniseImageForm .gallery-name').val();
        if ($('#recogniseImageForm .image-upload').val() != '') {
          file = $('#recogniseImageForm .image-upload')[0].files[0];
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function() {
            var fileData = parseImageData(reader.result);
            self.kairos.recognize(fileData, galleryName, self.success_cb);
          };
        };
      };
    });
  },

  success_cb: function(data) { //set up callback method?? idek what this means
    viewData = $('#viewData').html();
    $("#viewData").html(viewData + '<br /> <br />' + data.responseText);
    $('input :text').val('');
    $('input :file').val('');
  },

  validate: function(obj) {
    var isValid = true;
    errorAlert = '';
    var fileUploaded = false;
    if(obj.find('.image-upload').val() != '') {
      fileUploaded = true;
      console.log(obj.find('.image-upload').val());
    };
    obj.find('input').each(function() {
      if ($(this).attr('type') == 'text' && $(this).val() == '') {
        isValid = false;
        errorAlert = errorAlert + 'Enter value in ' + $(this).attr('name') + ' pls \n';
      }
    });
    if(isValid == false) {
      alert(errorAlert);
      console.log(errorAlert)
    }
    console.log('validation state: ' + isValid);
    return isValid;
  },
};

var parseImageData = function(imageData) {
  imageData = imageData.replace("data:image/jpeg;base64,", "");
  imageData = imageData.replace("data:image/jpg;base64,", "");
  imageData = imageData.replace("data:image/png;base64,", "");
  imageData = imageData.replace("data:image/gif;base64,", "");
  imageData = imageData.replace("data:image/bmp;base64,", "");
  return imageData;
};


$(document).ready(function() {
  checkAuth.init();
  cloudinaryFunc.setActions();
});
