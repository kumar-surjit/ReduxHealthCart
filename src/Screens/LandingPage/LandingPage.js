import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    imageCarousel: [
      {
        image: imagePath.carousel_img1,
        label_first: 'Shop Genuine',
        label_second: 'Health Supplements',
      },
      {
        image: imagePath.carousel_img2,
        label_first: 'Get Customized Diet',
        label_second: '& Workout Plans',
      },
      {
        image: imagePath.carousel_img3,
        label_first: 'Consult with',
        label_second: 'Best Nutritionists',
      },
      {},
    ],
    activeSlide: 0,
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <Image
          source={item.image}
          style={{
            resizeMode: 'contain',
            height: 300,
            width: 300,
            alignSelf: 'center',
          }}
        />
        <Text style={{textAlign: 'center', fontSize: 30, color: colors.white}}>
          {item.label_first}
          {'\n'}
          {item.label_second}
        </Text>
      </View>
    );
  };

  _renderItemPag({item, index}) {
    return <MySlideComponent data={item} />;
  }

  carouselIndexChangeHandler = index => {
    const {imageCarousel} = this.state;
    if (index < imageCarousel.length - 1) this.setState({activeSlide: index});
    else {
      this.props.navigation.navigate(navigationStrings.AuthPage);
    }
  };

  componentDidMount = () => {
    this.blurListener = this.props.navigation.addListener('blur', () => {
      if (this._carousel != undefined) this._carousel.snapToItem(0);
      this.setState({activeSlide: 0});
    });
  };

  componentWillUnmount = () => {
    this.blurListener();
  };

  render() {
    const {imageCarousel, activeSlide} = this.state;
    return (
      <View style={styles.pageContainer}>
        <View>
          <View>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.imageCarousel}
              renderItem={this._renderItem}
              itemWidth={350}
              sliderWidth={360}
              onSnapToItem={index => this.carouselIndexChangeHandler(index)}
            />
          </View>
          <Pagination
            dotsLength={imageCarousel.length}
            activeDotIndex={activeSlide}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            this.props.navigation.navigate(navigationStrings.AuthPage)
          }>
          <Text style={styles.buttonTextStyle}></Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.landingPageGreen,
    justifyContent: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 50,
  },
  buttonTextStyle: {color: colors.landingPageGreen, fontSize: 18},
});
