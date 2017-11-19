import React from 'react';
import {Text, View, Button} from 'react-native';
const util = require('util');

export default class LoadingScren extends React.Component {
  static navigationOptions = {
    title: 'LoadingScreen',
  };
  render () {
    console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null));
    var {navigate} = this.props.navigation;
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
}
