import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableWithoutFeedback,
    Dimensions,
    Modal,
  } from 'react-native';

import ImageElement from '../components/ImageElement';

const util = require('util');

export class PhotoScreen extends React.Component {
  static navigationOptions = {
    title: 'PhotoScreen',
  };
  render () {
    console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null));
    return(
      <View>
        <Text>
        Photos
        </Text>
        </View>
          );
  }
}

export default class App extends Component {

    state ={
        modalVisible: false,
        modalImage: require('../assets/images/img1.jpg'),
        images: [
            require('../assets/images/img1.jpg'),
            require('../assets/images/img2.jpg'),
            require('../assets/images/img3.jpg'),
            require('../assets/images/img4.jpg'),
            require('../assets/images/img5.jpg'),
        ]
    }

    setModalVisible(visible, imageKey) {
        this.setState({ modalImage: this.state.images[imageKey] });
        this.setState({ modalVisible: visible });
    }

    getImage() {
       return this.state.modalIamge;
    }

    render() {

        let images = this.state.images.map((val, key) => {
            return <TouchableWithoutFeedback key={key}
                        onPress={() => { this.setModalVisible(true, key)}}>
                        <View style={styles.imagewrap}>
                            <ImageElement imgsource={val}></ImageElement>
                        </View>
                    </TouchableWithoutFeedback>

        });

        return (
             <View style={styles.container}>

                 <Modal style={styles.modal} animationType={'fade'}
                        transparent={true} visible={this.state.modalVisible}
                        onRequestClose={() => {}}>

                        <View style={styles.modal}>
                            <Text style={styles.text}
                                onPress={() => {this.setModalVisible(false)}}>Close</Text>
                             <ImageElement imgsource={this.state.modalImage}></ImageElement>
                        </View>

                 </Modal>

                 {images}
             </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#eee',
        // For iOS status bar, we need a marginTop of 20.
        marginTop: 20,
    },
    imagewrap: {
        margin: 2,
        padding: 2,
        height: (Dimensions.get('window').height/3) - 12,
        width: (Dimensions.get('window').width/2) - 4,
        backgroundColor: '#fff',
    },
    modal: {
        flex: 1,
        padding: 40,
        backgroundColor: 'rgba(0,0,0, 0.9)'
    },
    text: {
       color: '#fff',
    }

});


AppRegistry.registerComponent('ImageGallery', () => ImageGallery)




/*import React from 'react-native';
import PhotoGrid from 'react-native-photo-grid';
let { Image, TouchableOpacity, Text } = React;

class BestGrid extends React.Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    // Build an array of 60 photos
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    });
    this.setState({ items });
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />
    );
  }

  renderHeader() {
    return(
      <Text>I'm on top!</Text>
    );
  }

  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

}

export default BestGrid;*/
