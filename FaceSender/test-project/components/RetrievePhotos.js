import React from 'react';
import { Text, View, CameraRoll, Image } from 'react-native';
import Expo from 'expo';
import Button from './ButtonTest';

class RetrievePhotos extends React.Component {
  state = {
    images: []
  };

  render () {
    const { viewStyle } = styles;
    const { images } = this.state;
    return (
      <View style={viewStyle}>
        <Button whenPressed={this._getPhotos}>
          Get Photos!
        </Button>
      </View>
    )
  };

  async _getPhotos() {
    const { Permissions } = Expo;
    const status = 'granted';
//    const { status } = Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
    if (status === 'granted') {
      alert('Status granted!');
      CameraRoll.getPhotos({
        first: 3,
        assetType: 'All'
      })
      .then(r => { this.setState({ images: r.edges }); console.log(images)});
    } else {
      alert('Please allow external storage!')
    };
  };
};

const styles = {
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 200,
    height: 200
  }
}

export default RetrievePhotos;
