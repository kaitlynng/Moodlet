import React, { Component } from 'react';
import {
  AppRegistry,
  Stylesheet,
  Text,
  Image
  } from 'react-native';

export default class ImageElement extends Component {
  render(){
    return (
      <Image source={this.props.imgsource} />
    );
  }
}

const styles = StyleSheet.Create({
  container: {
    flex: 1
    width: null
    alignSelf: 'stretch',
  }
}
);
