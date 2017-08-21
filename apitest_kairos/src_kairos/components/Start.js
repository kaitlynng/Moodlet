import React, { Component } from 'react';
import reactnative from 'react-native';
import $ from './jquery-3.2.1.min';
import Button from './Button';
import Methods from './Methods';

class HomePage extends Component({
  startKairosButton: function() {
    return <button id="startKairos"> Start Kairos </button>;
  }

  analyseButton: function() {
    return <button id='analyse'> Analyse Picture </button>;
  }

  loader: function() {
    return <Image source={require('./img/favicon.png')}/>
  }

  ReactDOM.render(
    <startKairosButton />,
    <analyseButton />,
    document.getElementById('container'),
    Methods()
  );


export default HomePage;
