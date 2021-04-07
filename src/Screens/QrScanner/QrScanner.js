import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';

const flashModes = [
  //   RNCamera.Constants.FlashMode.auto,
  //   RNCamera.Constants.FlashMode.on,
  RNCamera.Constants.FlashMode.off,
  RNCamera.Constants.FlashMode.torch,
];
const flashImages = [
  //   imagePath.ic_flash_auto,
  imagePath.ic_no_flash,
  imagePath.ic_torch,
  //   imagePath.ic_flash,
];

export default class ScanScreen extends Component {
  state = {
    currentIndex: 0,
  };

  changeFlashMode = () => {
    const {currentIndex} = this.state;
    let updatedIndex = currentIndex;
    if (currentIndex < flashModes.length - 1) updatedIndex += 1;
    else updatedIndex = 0;
    this.setState({currentIndex: updatedIndex});
  };

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  render() {
    const {currentIndex} = this.state;
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>Scan Qr Code of the Product</Text>
        }
        bottomContent={
          <View style={styles.flashContainer}>
            <TouchableOpacity onPress={this.changeFlashMode}>
              <Image
                source={flashImages[currentIndex]}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
                tintColor={colors.blackOpacity50}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity> */}
          </View>
        }
        flashMode={flashModes[currentIndex]}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  flashContainer: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    flex: 1,
    justifyContent: 'flex-start',
  },
});
