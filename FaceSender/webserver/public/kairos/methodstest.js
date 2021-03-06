// var Kairos = require('./kairos');

var emails = [
  { "poontzeyang": "poontzeyang@gmail.com"},
  {"kaitlynng": "kaitlyn.nky@gmail.com"},
  {"srivamsi": "srivamsi@gmail.com"}
];

var allDataObj = Array();

/* var socket = io.connect('http://localhost:3000');
socket.on('lol', function (msg) {
    console.log(msg);
});
socket.on('requestfromRN', function (msg) {
    console.log(msg);
    $('#btn_retrieveCloudinary').trigger("click");
}); */

cloudinaryFunc = {
  setActions: function() {
    $('#proceedCheck').hide();
    var self = this;
    $('#btn_retrieveCloudinary').click(function(e) {
      e.preventDefault();
      $('#viewData').empty();
      if ('#retrieveCloudinaryForm :input' != '') {
        galleryName = $('#retrieveCloudinaryForm .gallery-name').val();
        eventName = $('#retrieveCloudinaryForm .event-name').val();
        $.post('/retrieveCloudinary', JSON.stringify(eventName)) //cloudinary
          .done(function(data) {
            console.log('successful...?' + JSON.stringify(data));
            imageUrl = Array();
            for (i=0; i<data.resources.length; i++) {
              imageUrl.push(String(data.resources[i].url));
            };
            $('#viewData').html(String(imageUrl));
            self.faceRecogCombined(galleryName, eventName, imageUrl);
          }, function(err) {
            console.log('Error in jQuery! ' + err);
          });
      }; //closing for if loop
    }); //closing for .click loop

    $('#btn_proceedEmail').click(function(e) {
      e.preventDefault();
      console.log('It changed but dk if correct');
      console.log(allDataObj);
      subject_id = allDataObj[0].subject_id;
      recipient = emails.subject_id;
      images = allDataObj[0].images;
      console.log(subject_id);
      console.log(images);

      $.ajax({
        url: '/sendmail',
        type: 'POST',
        data: JSON.stringify({"recipient": recipient, "images": images}),
        success: function(response) {
          console.log('sent mail ' + response);
        }
      });
    });
  }, //closing for setActions

  faceRecogCombined: function(galleryName, eventName, imageUrl) {
    var matches;
    checkAuth.kairos.viewSubjectsInGallery(galleryName, function(data) { //obtain subjects from gallery
      var response = JSON.parse(data.responseText);
      console.log(response);
      for(i=0; i<response.subject_ids.length; i++) {
        allDataObj.push({"subject_id": response.subject_ids[i], "images": []});
      };
      console.log(imageUrl.length);
      for(i=0; i<imageUrl.length;i++) {
        var image = imageUrl[i];
        console.log('Image url: ' + String(image));
        checkAuth.kairos.recognize(String(image), galleryName, function(data) {
          $('#viewData').empty();
          console.log(data);
          $('#viewData').html(data.responseText);
          matches = JSON.parse(data.responseText);
          for (n=0; n<matches.images.length; n++) { //looping through all the faces identified
            var status = matches.images[n].transaction.status;
            var subject_Id = matches.images[n].transaction.subject_id;
            var confidence = matches.images[n].transaction.confidence;
            console.log('Status: ' + status);
            if(status == 'success') {
              console.log(String(image) + ' matches ' + subject_Id + ' with confidence ' + confidence);
              if (confidence > 0.5) {
                for(var x in allDataObj) { //looping through all the subject ids to find match
                  if (allDataObj[x].subject_id == subject_Id) {
                    console.log('lel');
                    allDataObj[x].images.push(String(image));
                    console.log(allDataObj[x]);
                  };
                };
              };
            };
          }; //closing loop for looping through faces identified
          console.log('matches done for one picture!');
          console.log(imageUrl.indexOf(image));
          if(imageUrl.indexOf(image) == (imageUrl.length-1)) {
            console.log('Done with all the images!');
            $('#viewData').empty();
            $('#proceedCheck').show();
            console.log('test test: ' + JSON.stringify(allDataObj));
            $('#btn_proceedEmail').trigger("click");
          };
        });  //closing loop for checkAuth.kairos.recognize;
      }; //closing loop to iterate through imageUrl
    }); //closing loop for viewSubjectsInGallery callback
  } //faceRecogCombined closing loop
};

checkAuth = {
  init: function () {
    $('#methods').hide();
    this.setActions();
    cloudinaryFunc.setActions();
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
});
