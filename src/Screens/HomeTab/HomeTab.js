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
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {connect} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Actions from '../../redux/actions';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage} from 'react-native-flash-message';
import styles from './styles';
import strings from '../../constants/lang';
import ImageViewer from 'react-native-image-zoom-viewer';

class HomeTab extends Component {
  state = {
    activeSlide: 0,
    visiblity: false,
    images: [],
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

  openImage = item => {
    const {visiblity} = this.state;
    console.log(item);
    let updatedImages = [];
    item.imageCarousel.forEach(val => {
      let temp = {url: val};
      temp.width = 200;
      temp.height = 200;
      updatedImages.push(temp);
    });
    this.setState({images: updatedImages, visiblity: !visiblity});
    console.log('UPDATED IMAGES : ', updatedImages);
    // this.props.navigation.navigate(navigationStrings.ViewImage, {
    //   images: item.imageCarousel,
    // });
  };

  openScanner = () => {
    this.props.navigation.navigate(navigationStrings.QrScanner);
  };

  toggleVisibility = () => {
    const {visiblity} = this.state;
    this.setState({visiblity: !visiblity});
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
    <View style={styles.productContainer}>
      <View style={styles.productHeaderContainer}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons name="flash" size={18} color="#FA8F06" />
          <Text style={{color: colors.themeBlue, fontSize: 12}}>
            {strings.FLASH_SALE}
          </Text>
        </View>
        <Text style={{fontSize: 13}}>
          {item.stock} {strings.LEFT}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => this.openImage(item)}>
        <ImageBackground source={item.coverImg} style={{height: 150}}>
          <Text style={styles.productDiscountContainer}>{item.discount}</Text>
          <View style={styles.ratingContianer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <MaterialCommunityIcons
              name="star"
              size={10}
              color={colors.themeGreen}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
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
        {this.getQuantity(item.id) === 0 ? (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.addCartButton}
            onPress={() => this.props.addToCart(item)}>
            <MaterialCommunityIcons
              name="plus"
              size={12}
              color={colors.white}
            />
            <Text style={{color: colors.white, fontSize: 12}}>
              {strings.ADD}
            </Text>
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
              <Text style={{color: colors.white}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.productQuantityStyle}>
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
              <Text style={{color: colors.white}}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  render() {
    const {activeSlide, visiblity, images} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.appBarContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}>
                <MaterialCommunityIcons
                  name="menu"
                  color={colors.themeDarkGreen}
                  size={30}
                />
              </TouchableOpacity>
              <Image source={imagePath.logo} style={styles.logoImage} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={styles.messageIconContainer}>
                <MaterialCommunityIcons
                  name="message-outline"
                  color={colors.themeDarkGreen}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainerQr}
                onPress={this.openScanner}>
                <MaterialCommunityIcons name="qrcode-scan" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 16}}
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.Cart)
                }>
                <MaterialCommunityIcons name="cart-outline" size={28} />
                {this.props.cartCount > 0 && (
                  <View style={styles.cartCountContainer}>
                    <Text style={{color: colors.white, fontSize: 12}}>
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
                backgroundColor: colors.dotColor,
              }}
              inactiveDotStyle={{
                backgroundColor: colors.inactiveDotColor,
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
          <View style={styles.flashHeadingContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              {strings.FLASH_SALE}
            </Text>
            <TouchableOpacity style={styles.viewAllStyle}>
              <Text style={{color: colors.viewAllColor, fontWeight: 'bold'}}>
                {strings.VIEW_ALL}
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
          <Modal
            visible={visiblity}
            transparent={true}
            onRequestClose={this.toggleVisibility}>
            <ImageViewer
              imageUrls={images}
              renderIndicator={() => null}
              backgroundColor={colors.whiteOpacity77}
            />
          </Modal>
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
