import React, { Component } from 'react';
import reactnative from 'react-native';
import $ from './jquery-3.2.1.min'
import kairos from './Kairos';

const app_id = 'f255048b';
const api_key = '9320ca4b9ef00594b197253a55856d16';

class methodsTest extends Component {
  componentDidMount() { //not sure if this needs to be in front of componentWillMount
    this.$el = $(this.el);
    this.$el.methodsTest();
  }

  componentWillMount() {
    this.$el.methodsTest('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }

}

// (2) pass your callback to the function
//kairos.viewGalleries(myCallback);
// (3) pass your params and callback to the function
//kairos.viewSubjectsInGallery(gallery_name, myCallback);
