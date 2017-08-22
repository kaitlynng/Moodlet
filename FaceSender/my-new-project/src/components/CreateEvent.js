import React, { Component } from 'react';
import native from 'react-native';

class CreateEvent extends Component {
  state = { event: [] };

  getPhotosFromFs = () => {
    Expo.FileSystem.makeDirectoryAsync('Expo.FileSystem.'.concat(this.props.eventName));
    imageNames = Expo.FileSystem.readDirectoryAsync(fileUri);
    for (i = 0; i < imageNames.length; i++) {
    imageInfo = Expo.FileSystem.getInfoAsync('filenametophotos/'.concat(imageNames[i]);
    if (imageInfo.exists == True) {
      if (imageInfo.modificationTIme < this.props.endTime && imageInfo.modificationTime > this.props.startTime) {
        Expo.FileSystem.copyAsync({ from: 'filenametophotos/'.concat(imageNames[i], to: 'Expo.FileSystem.'.concat(this.props.eventName)} )
        }
      }
    }
  }.then(response => this.setState({ event: getInfoAsync('Expo.FileSystem.'.concat(this.props.eventName)) }));

  getPhotosFromCamera = () => {
    tempPhotos = CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos'
    });

  };

  componentWillMount() {

  }
}
