import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {connect} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Actions from '../../redux/actions';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage} from 'react-native-flash-message';

class HomeTab extends Component {
  state = {
    activeSlide: 0,
  };

  addToCart = product => {
    let isItemInCart = false;
    console.log(this.props.cartItems);
    this.props.cartItems.every(item => {
      if (item.id == product.id) {
        isItemInCart = true;
        this.props.addQuantity(product.id);
        return false;
      }
      return true;
    });
    if (isItemInCart) {
      showMessage({
        message: 'Product Quantity',
        description: 'Quantity Added Successfully',
        type: 'success',
      });
    } else {
    }
  };

  getQuantity = id => {
    let currentQuantity = 0;
    this.props.cartItems.every(item => {
      if (item.id === id) {
        currentQuantity = item.productDetail.quantity;
        return false;
      }
      return true;
    });
    return currentQuantity;
    // console.log(currentQuantity);
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <Image
          source={item}
          style={{
            resizeMode: 'cover',
            height: Dimensions.get('window').height / 3,
            width: Dimensions.get('window').width,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  };

  renderProducts = ({item, index}) => (
    <View
      style={{
        backgroundColor: '#fff',
        marginRight: 8,
        elevation: 4,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginVertical: 8,
        marginLeft: 4,
        width: Dimensions.get('window').width / 2.4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 4,
          paddingBottom: 8,
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons name="flash" size={18} color="#FA8F06" />
          <Text style={{color: colors.themeBlue, fontSize: 12}}>
            Flash Sale
          </Text>
        </View>
        <Text style={{fontSize: 13}}>{item.stock} Left</Text>
      </View>
      <ImageBackground source={item.coverImg} style={{height: 150}}>
        <Text
          style={{
            borderColor: 'red',
            borderWidth: 1,
            color: 'red',
            alignSelf: 'flex-end',
            padding: 2,
            textAlign: 'center',
          }}>
          {item.discount}
        </Text>
        <View style={styles.ratingContianer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <MaterialCommunityIcons
            name="star"
            size={10}
            color={colors.themeGreen}
          />
        </View>
      </ImageBackground>
      <Text numberOfLines={2} style={{marginTop: 4}}>
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.discountedPriceStyle}>
            ₹{item.discountedPrice}
          </Text>
          <Text style={styles.originalPriceStyle}>₹{item.price}</Text>
        </View>
        {/* {this.getQuantity(item.id)} */}
        {this.getQuantity(item.id) === 0 ? (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              backgroundColor: '#29646d',
              borderRadius: 4,
              paddingVertical: 4,
              paddingHorizontal: 8,
              alignItems: 'center',
            }}
            onPress={() => this.props.addToCart(item)}>
            <MaterialCommunityIcons name="plus" size={12} color="#fff" />
            <Text style={{color: '#fff', fontSize: 12}}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 8, right: 4, left: 8, bottom: 8}}
              style={[
                styles.quantityOperationContainer,
                {
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  borderRightWidth: 0,
                },
              ]}
              onPress={() => this.props.subtractQuantity(item.id)}>
              <Text style={{color: '#fff'}}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 4,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}>
              {this.getQuantity(item.id)}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={{top: 8, right: 8, left: 4, bottom: 8}}
              style={[
                styles.quantityOperationContainer,
                {
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  borderLeftWidth: 0,
                },
              ]}
              onPress={() => this.props.addQuantity(item.id)}>
              <Text style={{color: '#fff'}}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  render() {
    const {activeSlide} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.appBarContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="menu"
                  color={colors.themeDarkGreen}
                  size={30}
                />
              </TouchableOpacity>
              <Image
                source={imagePath.logo}
                style={{
                  width: '55%',
                  resizeMode: 'contain',
                  height: 50,
                  marginLeft: 8,
                }}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: 'rgba(229, 255, 254, .4)',
                  padding: 4,
                }}>
                <MaterialCommunityIcons
                  name="message-outline"
                  color={colors.themeDarkGreen}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 16}}
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.Cart)
                }>
                <MaterialCommunityIcons name="cart-outline" size={28} />
                {this.props.cartCount > 0 && (
                  <View
                    style={{
                      backgroundColor: '#265164',
                      width: 16,
                      borderRadius: 30,
                      alignItems: 'center',
                      position: 'absolute',
                      right: 5,
                      top: -6,
                    }}>
                    <Text style={{color: '#fff', fontSize: 12}}>
                      {this.props.cartCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View>
              <Carousel
                data={this.props.carouselImage}
                renderItem={this._renderItem}
                itemWidth={Dimensions.get('window').width}
                sliderWidth={Dimensions.get('window').width}
                onSnapToItem={index => this.setState({activeSlide: index})}
              />
            </View>
            <Pagination
              dotsLength={this.props.carouselImage.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
              }}
              inactiveDotStyle={{
                backgroundColor: '#2f2f2e',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={1}
              containerStyle={{
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 8,
              paddingVertical: 8,
              backgroundColor: '#ececec',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Flash Sale</Text>
            <TouchableOpacity style={styles.viewAllStyle}>
              <Text style={{color: '#274B5D', fontWeight: 'bold'}}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={true}
            data={this.props.products}
            renderItem={this.renderProducts}
            style={{paddingLeft: 8}}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.homeReducer.products,
    carouselImage: state.homeReducer.carouselImage,
    cartCount: state.homeReducer.cartCount,
    cartItems: state.homeReducer.cartItems,
  };
};

const mapDispatchToProps = dispatch => ({
  addToCart: product => dispatch(Actions.addToCart(product)),
  addQuantity: id => dispatch(Actions.addQuantity(id)),
  subtractQuantity: id => dispatch(Actions.subtractQuantity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);

const styles = StyleSheet.create({
  container: {},
  appBarContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  appBarText: {
    fontSize: 14,
    color: '#D2AA67',
    fontWeight: 'bold',
  },
  appBarRight: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginRight: 16,
  },
  headingStyle: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: 'LucyRounded-Bold',
  },
  coverImgStyle: {
    height: 250,
    resizeMode: 'contain',
  },
  ratingContianer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 10,
    left: 5,
  },
  ratingText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 4,
    fontSize: 12,
  },
  productNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountedPriceStyle: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPriceStyle: {
    textDecorationLine: 'line-through',
    color: '#919296',
  },
  discountStyle: {
    color: colors.themeOrange,
  },
  productDetailStyle: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 20,
  },
  viewAllStyle: {backgroundColor: '#fff', borderRadius: 4, padding: 8},
  quantityOperationContainer: {
    borderWidth: 1,
    paddingHorizontal: 6,
    backgroundColor: '#29646d',
  },
});
