import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage} from 'react-native-flash-message';
import strings from '../../constants/lang';

class Cart extends Component {
  _renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <View style={styles.productDetailsContainer}>
        <Image
          source={item.productDetail.product.coverImg}
          style={{height: 150, flex: 0.4}}
        />
        <View style={{flex: 0.6, paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', paddingBottom: 4}}>
            {item.productDetail.product.name}
          </Text>
          <Text numberOfLines={1}>
            {item.productDetail.product.description}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <TouchableOpacity
              style={[
                styles.quantityOperationStyle,
                {
                  paddingHorizontal: 10,
                },
              ]}
              onPress={() => this.props.subtractQuantity(item.id)}>
              <Text style={{fontSize: 18}}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                borderRadius: 4,
                borderColor: colors.gray,
                borderWidth: 1,
                paddingHorizontal: 16,
                marginHorizontal: 8,
                alignSelf: 'center',
              }}>
              {item.productDetail.quantity}
            </Text>
            <TouchableOpacity
              style={[
                styles.quantityOperationStyle,
                {
                  paddingHorizontal: 7,
                },
              ]}
              onPress={() => this.props.addQuantity(item.id)}>
              <Text style={{fontSize: 18}}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={{paddingTop: 6}}>
            ₹
            <Text style={styles.discountedPriceStyle}>
              {item.productDetail.product.discountedPrice}
              {'  '}
            </Text>
            <Text style={styles.originalPriceStyle}>
              ₹{item.productDetail.product.price}
            </Text>
            <Text style={styles.discountStyle}>
              {' '}
              {item.productDetail.product.discount}
            </Text>
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingVertical: 16}}>
        <TouchableOpacity
          style={styles.buttonContainerLeft}
          onPress={() => this.props.removeItemFromCart(item.id)}>
          <Text style={styles.buttonLeftStyle}>{strings.REMOVE}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.6,
          }}>
          <Text style={styles.buttonRightStyle}>
            {strings.MOVE_TO_WISHLIST}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  getMRP = () => {
    if (this.props.cartCount > 0) {
      let result = 0;
      this.props.cartItems.forEach(item => {
        result +=
          item.productDetail.quantity *
          Number(item.productDetail.product.price);
      });
      return result;
    } else return 0;
  };

  getDiscount = () => {
    if (this.props.cartCount > 0) {
      let result = 0;
      this.props.cartItems.forEach(item => {
        result +=
          Number(item.productDetail.product.price) -
          Number(item.productDetail.product.discountedPrice);
      });
      return result;
    } else return 0;
  };

  getTotal = () => {
    if (this.props.cartCount > 0) {
      let result = 0;
      this.props.cartItems.forEach(item => {
        result +=
          item.productDetail.quantity *
          Number(item.productDetail.product.discountedPrice);
      });
      return result;
    } else return 0;
  };

  placeOrder = () => {
    this.props.placeOrder();
    showMessage({
      message: 'Order Placed',
      description: 'Your order has been placed.',
      type: 'success',
    });
    this.props.navigation.navigate(navigationStrings.Home);
  };

  render() {
    if (this.props.cartCount === 0) {
      return (
        <View
          style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={imagePath.ic_empty_cart} />
          <Text style={{fontWeight: 'bold', marginTop: 8, fontSize: 20}}>
            Hey, it feels so light!
          </Text>
          <Text style={{color: colors.cartTextEmpty, marginTop: 8}}>
            There is nothing in your bag. Let's add some items.
          </Text>
        </View>
      );
    } else
      return (
        <View
          style={{
            backgroundColor: colors.cartBg,
            flex: 1,
            paddingTop: 16,
          }}>
          <FlatList
            data={this.props.cartItems}
            renderItem={this._renderItem}
            keyExtractor={item => String(item.id)}
            style={{paddingHorizontal: 8, marginBottom: 10}}
          />
          <View
            style={{
              backgroundColor: colors.white,
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                borderBottomColor: colors.gray,
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              {strings.PRICE_DETAILS}
            </Text>
            <View style={styles.priceDetailsStyle}>
              <Text>{strings.TOTAL_MRP}</Text>
              <Text>₹{this.getMRP()}</Text>
            </View>
            <View
              style={[
                styles.priceDetailsStyle,
                {borderBottomWidth: 1, borderBottomColor: colors.gray},
              ]}>
              <Text>{strings.TOTAL_DISCOUNT}</Text>
              <Text>₹{this.getDiscount()}</Text>
            </View>
            <View style={styles.priceDetailsStyle}>
              <Text style={{fontWeight: 'bold'}}>{strings.TOTAL_AMOUNT}</Text>
              <Text style={{fontWeight: 'bold'}}>₹{this.getTotal()}</Text>
            </View>
            <View style={{marginTop: 4}}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  backgroundColor: colors.themeGreen,
                  borderRadius: 4,
                }}
                onPress={this.placeOrder}>
                <Text
                  style={{
                    color: colors.white,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {strings.PLACE_ORDER}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  addToCart: product => dispatch(actions.addToCart(product)),
  addQuantity: id => dispatch(actions.addQuantity(id)),
  subtractQuantity: id => dispatch(actions.subtractQuantity(id)),
  removeItemFromCart: id => dispatch(actions.removeItemFromCart(id)),
  placeOrder: () => dispatch(actions.placeOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 4,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  productDetailsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    marginHorizontal: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.lightestGray,
  },
  discountedPriceStyle: {
    fontWeight: 'bold',
  },
  originalPriceStyle: {
    textDecorationLine: 'line-through',
    color: colors.grayish,
  },
  discountStyle: {
    color: colors.red,
  },
  buttonContainerLeft: {
    flex: 0.4,
    borderRightWidth: 1.5,
    borderRightColor: colors.lightestGray,
  },
  buttonLeftStyle: {
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRightStyle: {
    textAlign: 'center',
    color: colors.themeGreen,
    fontWeight: 'bold',
  },
  priceDetailsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  quantityOperationStyle: {
    borderRadius: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    height: 26,
  },
});
