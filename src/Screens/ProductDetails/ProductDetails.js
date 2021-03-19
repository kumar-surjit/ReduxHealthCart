import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationStrings from '../../constants/navigationStrings';
import Carousel from 'react-native-snap-carousel';
import colors from '../../styles/colors';

export default class ProductDetails extends Component {
  state = {
    selectedSizeIndex: undefined,
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: item}}
          style={{resizeMode: 'cover', height: 480}}
        />
      </View>
    );
  };

  render() {
    const {isSizeClicked, selectedSizeIndex} = this.state;
    // console.log(this.props.route.params.details);
    return (
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity
            style={styles.appbarIconStyle}
            onPress={() => this.props.navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              style={styles.iconSpacing}
            />
          </TouchableOpacity>
          <View style={styles.appBarRight}>
            <TouchableOpacity style={styles.appbarIconStyle}>
              <MaterialCommunityIcons
                name="share-variant"
                size={25}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.appbarIconStyle}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={25}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.appbarIconStyle}>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={25}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <Carousel
            data={this.props.route.params.details.imageCarousel}
            renderItem={this._renderItem}
            sliderWidth={360}
            itemWidth={350}
            sliderHeight={490}
            itemHeight={480}
          />
          <View style={styles.productHeading}>
            <Text style={{marginBottom: 4}}>
              {this.props.route.params.details.name}
            </Text>
            <Text>
              ₹
              <Text style={styles.discountedPriceStyle}>
                {this.props.route.params.details.discountedPrice}
                {'  '}
              </Text>
              <Text style={styles.originalPriceStyle}>
                ₹{this.props.route.params.details.price}
              </Text>
              <Text style={styles.discountStyle}>
                {' '}
                {this.props.route.params.details.discount}
              </Text>
            </Text>
          </View>
          <View style={{height: 16, backgroundColor: '#e1e1e1'}} />
          <View style={{padding: 14}}>
            <Text style={{fontWeight: 'bold'}}>
              Easy 30 days returns and exchanges
            </Text>
            <Text>
              Choose to return or exchange for a different size (if available)
              within 30 days.
            </Text>
          </View>
          <View style={{height: 16, backgroundColor: '#e1e1e1'}} />
          <View style={{paddingVertical: 12, paddingHorizontal: 16}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#919095'}}>SELECT SIZE (UK SIZE)</Text>
              <Text style={{color: '#E36389', fontWeight: 'bold'}}>
                SIZE CHART
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              {this.props.route.params.details.sizes.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      {
                        borderWidth: 1,
                        borderRadius: 30,
                        paddingVertical: 8,
                        marginRight: 8,
                      },
                      item < 10
                        ? {paddingHorizontal: 13}
                        : {paddingHorizontal: 10},
                      index === selectedSizeIndex && {borderColor: '#FF406C'},
                    ]}
                    onPress={() => {
                      console.log(index);
                      this.setState({
                        selectedSizeIndex: index,
                      });
                    }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#919095',
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <View>
              <Text style={{fontWeight: 'bold'}}>Model Size & Fit</Text>
              <Text style={{marginTop: 16, color: '#919095'}}>RoundToe</Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 8,
          }}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                borderColor: '#B9B9BC',
                borderWidth: 1,
                marginLeft: 10,
              },
            ]}>
            <MaterialCommunityIcons name="heart-outline" size={18} />
            <Text style={{marginLeft: 4}}>WISHLIST</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {backgroundColor: colors.themePinkColor, marginRight: 15},
            ]}
            onPress={() => {
              this.props.navigation.navigate(navigationStrings.Home, {
                addedToBag: 1,
                product: this.props.route.params.details,
              });
            }}>
            <MaterialCommunityIcons name="shopping" size={18} color={'#fff'} />
            <Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 4}}>
              ADD TO BAG
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: 'transparent',
  },
  appBarRight: {
    flexDirection: 'row',
  },
  appbarIconStyle: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 4,
    marginRight: 10,
  },
  productImage: {
    height: 450,
  },
  ratingContianer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 4,
  },
  productHeading: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  discountedPriceStyle: {
    fontWeight: 'bold',
  },
  originalPriceStyle: {
    textDecorationLine: 'line-through',
    color: '#919296',
  },
  discountStyle: {
    color: '#e56f2e',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
