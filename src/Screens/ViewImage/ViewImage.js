import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import colors from '../../styles/colors';
import {MaterialIndicator} from 'react-native-indicators';

class ViewImage extends React.Component {
  state = {
    images: [],
  };

  setImages = () => {
    const {images} = this.props.route.params;
    let updatedImages = [];
    images.forEach(val => {
      let temp = {url: val};
      updatedImages.push(temp);
    });
    this.setState({images: updatedImages});
    console.log('UPDATED IMAGES : ', updatedImages);
  };

  componentDidMount = () => {
    this.setImages();
  };

  render() {
    console.log(this.props);
    const {images} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ImageViewer
            imageUrls={images}
            renderIndicator={() => (
              <View style={{paddingBottom: 40}}>
                <MaterialIndicator color={colors.themeGreen} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightWhite,
    flex: 1,
  },
});

export default ViewImage;
