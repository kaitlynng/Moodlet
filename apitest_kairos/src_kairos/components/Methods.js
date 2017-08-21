import React, { Component } from 'react';
import reactnative from 'react-native';
import $ from './jquery-3.2.1.min';
import kairos from './Kairos';

const app_id = 'f255048b';
const api_key = '9320ca4b9ef00594b197253a55856d16';

class Methods extends Component({
  $('#startKairos').click(function() {
    self.kairos = new Kairos(app_id, api_key);
    self.kairos.checkAuthentication(function(cb) {
      if (cb.statusText != 'error') {
        break;
      }
      else {AuthenticationError()};
    });
  }

  AuthenticationError: function() {
    alert("Authentication Error!");
  });

  $('#analyse').click(function() {

  });


  componentDidMount() { //not sure if this needs to be in front of componentWillMount
    this.$el = $(this.el);
    this.$el.Methods();
  }

  componentWillMount() {
    this.$el.Methods('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }

});

// (2) pass your callback to the function
//kairos.viewGalleries(myCallback);
// (3) pass your params and callback to the function
//kairos.viewSubjectsInGallery(gallery_name, myCallback);
