import React, { Component } from 'react';
import Native from 'react-native';

class CreateEvent extends Component {
  state = { event: [] };

/*
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
*/

  getPhotosFromCamera = () => {
    checkedPhotos = [];
    
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos'
    }).then(r => { checkedPhotos = r.edges });

    for (i = 0; i < 10; i++) {
      if ((tempPhotos[i].timestamp < this.props.endTime) && (tempPhotos[i].timestamp > this.props.startTime)) {
        checkedPhotos.push(tempPhotos[i]);
      } else {
        end = True;
        break;
      }
    };

    return checkedPhotos
  }

  componentWillMount() {
    end = False;
    collatePhotos = [];
    while (end == False) {
      this.setState( event.concat(getPhotosFromCamera());
    };
  
  render() {
    console.log(this.state);
    return { blah };
    //must I return a View object here?
  }
};

export default CreateEvent;
