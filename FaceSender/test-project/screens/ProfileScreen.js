import React from 'react';
import {
  View, // https://facebook.github.io/react-native/docs/view.html
  Text, // https://facebook.github.io/react-native/docs/text.html
  StyleSheet, // https://facebook.github.io/react-native/docs/stylesheet.html
  Image, // https://facebook.github.io/react-native/docs/image.html
  Button, // https://facebook.github.io/react-native/docs/button.html
  } from 'react-native';
import Expo from 'expo';

import {
  StackNavigator,
} from 'react-navigation';


class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <Text
      onPress= { ()=> navigate('Home') }>Navigate to Home
      </Text>
    </View>
  );
}
}

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}, {
  navigationOptions:{
    headerStyle:{
      marginTop:Expo.Constants.statusBarHeight
    }
  }
}
});

export default class APP extends React.Component {
  render() {
    return <NavigationApp />;
  }
}
