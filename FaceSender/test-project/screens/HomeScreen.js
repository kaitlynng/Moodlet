const { TelegramClient } = require('messaging-api-telegram');

import React from 'react';
import {
  View, // https://facebook.github.io/react-native/docs/view.html
  Text, // https://facebook.github.io/react-native/docs/text.html
  StyleSheet, // https://facebook.github.io/react-native/docs/stylesheet.html
  Image, // https://facebook.github.io/react-native/docs/image.html
  Button, // https://facebook.github.io/react-native/docs/button.html
} from 'react-native';

const client = TelegramClient.connect('490953513:AAGEU_TRCEU3aev6_4nu8VfNcccGivU36tk');

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

  client.sendPhoto(259921505, 'https://i.imgur.com/NDqNcXi.png', {
  caption: 'Hey this is your photo!',
  disable_notification: false,
  })
  .catch((error) => {
    console.log("Api call error");
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

export default App;
