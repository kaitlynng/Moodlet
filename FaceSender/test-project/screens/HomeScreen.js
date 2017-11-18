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


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (


      <View style={styles.section}>
        <Button
        title="Retrieve Photos"
        color={'#16a085'}
        accessibilityLabel="See an informative alert"
          onPress= { ()=> navigate('Profile') }>Navigate to Profile
        >
        </Button>
      </View>




    );
}
}



class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Photos',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
    </View>
  );
}
}



  const NavigationApp = StackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
  },{
    navigationOptions:{
      headerStyle:{
        marginTop:Expo.Constants.statusBarHeight
      }
    }
  }
);

  export default class APP extends React.Component {
    render() {
      return <NavigationApp />;
    }
  }


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      title: 'Welcome!',
    };

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    console.log('Pressed');

    this.setState({
      title: 'Photos retrieved!',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.section, { flex: 1 }]}>
          <Image
            style={styles.logo}
            source={{ uri: 'https://i.imgur.com/JGdKNYe.png' }}
          />

          <Text style={styles.textLarge}>
            {this.state.title}
          </Text>
      </View>

        <View style={styles.section}>
          <Button
            onPress={this.onButtonPress.bind(this)}
            title="Retrieve Photos"
            color={'#16a085'}
            accessibilityLabel="See an informative alert"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  textLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  textSmall: {
    color: '#34495e',
    fontStyle: 'italic',
    paddingBottom: 5,
  },
});
