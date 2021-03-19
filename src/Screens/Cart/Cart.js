import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import imagePath from '../../../imagePath';
import TrackingModal from '../../components/TrackingModal';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';

export default class Cart extends Component {
  state = {
    product: [
      {
        id: 1,
        name: 'LOCOMOTIVE',
        price: '995',
        discountedPrice: '646',
        discount: '35% OFF',
        coverImg:
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
        rating: '3.9',
        sizes: [6, 7, 8, 9, 10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
        ],
        description: 'Men White Urban Athleisure Shoes',
      },
    ],
    visibleState: false,
    displayState: 'none',
  };

  _renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.productDetailsContainer}>
        <Image
          source={{uri: item.product.coverImg}}
          style={{height: 150, flex: 0.4}}
        />
        <View style={{flex: 0.6, paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', paddingBottom: 4}}>
            {item.product.name}
          </Text>
          <Text numberOfLines={1}>{item.product.description}</Text>
          <Text style={{fontWeight: 'bold'}}>Quantity: {item.quantity}</Text>
          <Text style={{paddingTop: 6}}>
            ₹
            <Text style={styles.discountedPriceStyle}>
              {item.product.discountedPrice}
              {'  '}
            </Text>
            <Text style={styles.originalPriceStyle}>₹{item.product.price}</Text>
            <Text style={styles.discountStyle}> {item.product.discount}</Text>
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingVertical: 16}}>
        <TouchableOpacity style={styles.buttonContainerLeft}>
          <Text style={styles.buttonLeftStyle}>REMOVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.6,
          }}>
          <Text style={styles.buttonRightStyle}>MOVE TO WISHLIST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  getMRP = () => {
    if (this.props.route.params !== undefined) {
      let result = 0;
      for (let i = 0; i < this.props.route.params.cartProducts.length; i++) {
        let currentValue = this.props.route.params.cartProducts[
          i
        ].product.price.replace(',', '');
        result += Number(currentValue);
      }
      return result;
    } else return 0;
  };

  getDiscount = () => {
    if (this.props.route.params !== undefined) {
      let result = 0;
      for (let i = 0; i < this.props.route.params.cartProducts.length; i++) {
        let currentValue =
          this.props.route.params.cartProducts[i].product.price.replace(
            ',',
            '',
          ) -
          this.props.route.params.cartProducts[
            i
          ].product.discountedPrice.replace(',', '');
        result += Number(currentValue);
      }
      return result;
    } else return 0;
  };

  getTotal = () => {
    if (this.props.route.params !== undefined) {
      let result = 0;
      for (let i = 0; i < this.props.route.params.cartProducts.length; i++) {
        let currentValue = this.props.route.params.cartProducts[
          i
        ].product.discountedPrice.replace(',', '');
        result += Number(currentValue);
      }
      return result;
    } else return 0;
  };

  placeOrderClicked = () => {
    // const {visibleState, displayState} = this.state;
    // console.log('hello');
    // this.setState({
    //   visibleState: true,
    //   displayState: 'flex',
    // });
    let pricing = {};
    pricing.mrp = this.getMRP();
    pricing.discount = this.getDiscount();
    pricing.total = this.getTotal();
    this.props.navigation.replace(navigationStrings.OrderConfirm, {
      data: pricing,
    });
  };

  trackingModalCloseButtonPressed = () => {
    this.props.navigation.navigate(navigationStrings.Home, {addedToBag: -1});
  };

  render() {
    const {product, visibleState, displayState} = this.state;
    if (this.props.route.params.cartProducts.length === 0) {
      return (
        <View
          style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={imagePath.ic_empty_cart} />
          <Text style={{fontWeight: 'bold', marginTop: 8, fontSize: 20}}>
            Hey, it feels so light!
          </Text>
          <Text style={{color: '#999BA3', marginTop: 8}}>
            There is nothing in your bag. Let's add some items.
          </Text>
        </View>
      );
    } else
      return (
        <View
          style={{
            backgroundColor: '#dfdfe2',
            flex: 1,
            paddingTop: 16,
          }}>
          <FlatList
            data={this.props.route.params.cartProducts}
            renderItem={this._renderItem}
            keyExtractor={(item) => String(item.product.id)}
            style={{paddingHorizontal: 8, marginBottom: 10}}
          />
          <TrackingModal
            visibility={visibleState}
            display={displayState}
            closeFunc={this.trackingModalCloseButtonPressed}
          />
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              PRICE DETAILS
            </Text>
            <View style={styles.priceDetailsStyle}>
              <Text>Total MRP</Text>
              <Text>₹{this.getMRP()}</Text>
            </View>
            <View
              style={[
                styles.priceDetailsStyle,
                {borderBottomWidth: 1, borderBottomColor: 'gray'},
              ]}>
              <Text>Total Discount</Text>
              <Text>₹{this.getDiscount()}</Text>
            </View>
            <View style={styles.priceDetailsStyle}>
              <Text style={{fontWeight: 'bold'}}>Total Amount</Text>
              <Text style={{fontWeight: 'bold'}}>₹{this.getTotal()}</Text>
            </View>
            <View style={{marginTop: 4}}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  backgroundColor: colors.themePinkColor,
                  borderRadius: 4,
                }}
                onPress={this.placeOrderClicked}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  PLACE ORDER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  productDetailsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    marginHorizontal: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#D4D5D9',
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
  buttonContainerLeft: {
    flex: 0.4,
    borderRightWidth: 1.5,
    borderRightColor: '#D4D5D9',
  },
  buttonLeftStyle: {
    color: '#696B79',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRightStyle: {
    textAlign: 'center',
    color: colors.themeLightPink,
    fontWeight: 'bold',
  },
  priceDetailsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
