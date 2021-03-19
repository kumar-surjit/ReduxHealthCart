import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';

export default class LandingPage extends Component {
  state = {
    imageCarousel: [
      imagePath.carousel_img1,
      imagePath.carousel_img2,
      imagePath.carousel_img3,
      imagePath.carousel_img4,
    ],
    activeSlide: 0,
  };
  _renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <Image
          source={item}
          style={{
            resizeMode: 'contain',
            height: 300,
            width: 300,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };

  _renderItemPag({item, index}) {
    return <MySlideComponent data={item} />;
  }

  render() {
    const {imageCarousel, activeSlide} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.landingPageGreen}}>
        <View>
          <Carousel
            data={this.state.imageCarousel}
            renderItem={this._renderItem}
            itemWidth={350}
            sliderWidth={360}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
        </View>
        <Pagination
          dotsLength={imageCarousel.length}
          activeDotIndex={activeSlide}
          containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
      </View>
    );
  }
}
