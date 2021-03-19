import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {connect} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';

class Home extends Component {
    
  state = {
    productsArray: [
      {
        id: 1,
        name: 'LOCOMOTIVE',
        price: '995',
        discountedPrice: '646',
        discount: '35% OFF',
        coverImg:
          imagePath.slider_img1,
        rating: '3.9',
        sizes: [6, 7, 8, 9, 10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/9ae1cdc6-8d0d-42f9-9dde-87ad334d182c1606963394083LOCOMOTIVEMenWhiteSneakers1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/aa2a7e4b-31bc-4abb-bc1e-ff2dddb1a8ad1606963394211LOCOMOTIVEMenWhiteSneakers2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/10f2d7fe-319e-46e2-bb55-cd7104242cb21606963394383LOCOMOTIVEMenWhiteSneakers3.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9785483/2020/12/3/1512605b-2cc2-4f66-8dbc-0a11b301e8351606963394496LOCOMOTIVEMenWhiteSneakers4.jpg',
        ],
        description: 'Men Sneakers',
      },
      {
        id: 2,
        name: 'Roadster',
        price: '3,499',
        discountedPrice: '1,924',
        discount: '45% OFF',
        coverImg:
        imagePath.slider_img2,
        rating: '3.9',
        sizes: [10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543818/2021/2/17/17432a3f-f3f6-4415-94be-10b5d758a5b61613565716839-Roadster-Men-White-Solid-Sneakers-7261613565716077-1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543818/2021/2/17/3dd3a1fa-07ca-435c-a0c3-45785d437d861613565716820-Roadster-Men-White-Solid-Sneakers-7261613565716077-2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543818/2021/2/17/55ffc63d-302d-42d5-99a5-b54c0cfb9abd1613565716802-Roadster-Men-White-Solid-Sneakers-7261613565716077-3.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543818/2021/2/17/db5e7d78-12ac-4ae5-a29a-e68e0f2bd24d1613565716785-Roadster-Men-White-Solid-Sneakers-7261613565716077-4.jpg',
        ],
        description: 'Men Solid Sneakers',
      },
      {
        id: 3,
        name: 'HRX by Hrithik Roshan',
        price: '3,499',
        discountedPrice: '2,274',
        discount: '35% OFF',
        coverImg:
        imagePath.slider_img3,
        rating: '4.8',
        sizes: [6, 7, 10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543500/2021/2/10/aef0409d-cf7f-43d5-91fd-bb615649de7d1612955971198-HRX-by-Hrithik-Roshan-Men-Casual-Shoes-1291612955970345-1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543500/2021/2/10/e42f99d4-b8d1-4fe7-b723-4e3f1b703d681612955971182-HRX-by-Hrithik-Roshan-Men-Casual-Shoes-1291612955970345-2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543500/2021/2/10/6c002e48-10dd-4602-afd0-8c7c378920cb1612955971164-HRX-by-Hrithik-Roshan-Men-Casual-Shoes-1291612955970345-3.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/12543500/2021/2/10/43cf82cc-ddb7-4078-a497-18acf382130e1612955971148-HRX-by-Hrithik-Roshan-Men-Casual-Shoes-1291612955970345-4.jpg',
        ],
        description: 'Men Uraban Street Shoes',
      },
      {
        id: 4,
        name: 'H&M',
        price: '2,699',
        discountedPrice: '1,349',
        discount: '50% OFF',
        coverImg:
        imagePath.slider_img4,
        rating: '4.5',
        sizes: [6, 7, 8, 9, 10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2021/1/11/d237d30f-b0cc-4573-90a3-a87b85b0dfbd1610361197523-1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2021/1/11/3b5de120-0f49-4f44-8c14-acb1ef0623e01610361197566-3.jpg',
        ],
        description: 'Men Hi-top Trainers',
      },
      {
        id: 5,
        name: 'HIGHLANDER',
        price: '1,990',
        discountedPrice: '796',
        discount: '60% OFF',
        coverImg:
        imagePath.slider_img5,
        rating: '4.3',
        sizes: [7, 8, 9, 10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11986104/2020/6/25/b4ff6d4f-bc72-43a9-b5e6-bd9c0a6f10da1593065484978HIGHLANDERMenWhiteSolidSneakers1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11986104/2020/6/25/827aca4c-d44c-4568-9867-4f274a8e2d4f1593065485050HIGHLANDERMenWhiteSolidSneakers2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/11986104/2020/6/25/f9d4f80d-18bf-49a1-9ca1-e1f3a45f045a1593065485116HIGHLANDERMenWhiteSolidSneakers3.jpg',
        ],
        description: 'Men Solid Sneakers',
      },
      {
        id: 6,
        name: 'El Paso',
        price: '4,249',
        discountedPrice: '849',
        discount: '80% OFF',
        coverImg:
        imagePath.slider_img6,
        rating: '3.9',
        sizes: [6, 7, 8],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9249461/2019/6/27/0a7eb748-61fe-44cd-bda6-136e54ebab261561633261914-El-Paso-Men-Brown-Derbys-7821561633260133-1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9249461/2019/6/27/22a4da19-a29b-4478-82d1-d33de328f0201561633261889-El-Paso-Men-Brown-Derbys-7821561633260133-2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9249461/2019/6/27/1b080971-3da7-4cf3-a459-de47f5cdc02c1561633261864-El-Paso-Men-Brown-Derbys-7821561633260133-3.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9249461/2019/6/27/417e2cca-764d-4433-88ee-fbca3a5ade851561633261840-El-Paso-Men-Brown-Derbys-7821561633260133-4.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/9249461/2019/6/27/24aeaf38-6105-4be3-a4d8-c9533c52743e1561633261813-El-Paso-Men-Brown-Derbys-7821561633260133-5.jpg',
        ],
        description: 'Men Derbys',
      },
      {
        id: 7,
        name: 'Aldo',
        price: '12,999',
        discountedPrice: '9,099',
        discount: '30% OFF',
        coverImg:
        imagePath.slider_img1,
        rating: '4.7',
        sizes: [7, 8, 10, 11],
        imageCarousel: [
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/6/4223ec97-927c-4d5e-b7e6-b3443a6c96941601942226034-1.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/6/3128cb77-1fae-42e9-bfb8-d549fc86849f1601942226094-2.jpg',
          'https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/productimage/2020/10/6/a5f09a23-c24c-4e80-af0c-2da938ae04601601942226148-3.jpg',
        ],
        description: 'Men Leather Loafers',
      },
    ],
    itemsInCart: 0,
    cartItems: [],
  };

  componentDidMount() {
    // console.log(this.props.route);

    this.focusListener = this.props.navigation.addListener('focus', () => {
      console.log(this.props.route.params);
      if (this.props.route.params !== undefined) {
        if (this.props.route.params.addedToBag === -1) {
          this.setState({
            itemsInCart: 0,
            cartItems: [],
          });
        } else if (this.props.route.params.addedToBag != null) {
          const {itemsInCart, cartItems} = this.state;
          let newProduct = this.props.route.params.product;
          let result = cartItems.findIndex(
            (singleProduct) =>
              JSON.stringify(singleProduct.product) ===
              JSON.stringify(newProduct),
          );
          if (result !== -1) {
            let changeQuantity = {
              product: newProduct,
              quantity: cartItems[result].quantity + 1,
            };
            cartItems[result] = changeQuantity;
          } else {
            let newValue = itemsInCart + this.props.route.params.addedToBag;
            let newProductInCart = {
              product: newProduct,
              quantity: 1,
            };
            let newCartValue = [...cartItems, newProductInCart];
            this.setState({
              itemsInCart: newValue,
              cartItems: newCartValue,
            });
          }
          // console.log(this.props);
          this.props.route.params.addedToBag = null;
          // console.log(this.props);
        }
        // console.log('not undefined', this.props.route.params);
      }
      console.log(this.props.route.params);
      // console.log('focused');
    });
  }

  componentWillUnmount() {
    // alert('hello');
    this.focusListener();
    // console.log('willunmount');
  }

  changeItemsinCart = (changeType) => {
    const {itemsInCart} = this.state;
    let prevState = itemsInCart;
    if (prevState == 0 && changeType === 'subtract') return;
    else
      switch (changeType) {
        case 'add':
          this.setState({
            itemsInCart: prevState + 1,
          });
          break;
        case 'subtract':
          this.setState({
            itemsInCart: prevState - 1,
          });
          break;
      }
    console.log(itemsInCart);
  };

  renderItem = ({item, index}) => {
    const {productsArray, cartItems} = this.state;
    return (
      <TouchableOpacity
        style={[
          {flex: 1, borderBottomColor: '#b1b3bc', borderBottomWidth: 1},
          index % 2 === 0 && {borderRightColor: '#b1b3bc', borderRightWidth: 1},
          index === productsArray.length - 1 && {flex: 0.5},
        ]}
        onPress={() =>
          this.props.navigation.navigate('ProductDetails', {
            details: item,
          })
        }>
        <ImageBackground
          source={item.coverImg}
          style={styles.coverImgStyle}>
          <View style={styles.ratingContianer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <MaterialCommunityIcons
              name="star"
              size={10}
              color={colors.themeGreen}
            />
          </View>
        </ImageBackground>
        <View style={styles.productDetailStyle}>
          <View style={styles.productNameContainer}>
            <Text>{item.name}</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="heart-outline"
                size={25}
                color={'#919296'}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
          </View>
          <Text>
            ₹
            <Text style={styles.discountedPriceStyle}>
              {item.discountedPrice}
              {'  '}
            </Text>
            <Text style={styles.originalPriceStyle}>₹{item.price}</Text>
            <Text style={styles.discountStyle}> {item.discount}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log(this.props.cartCount);
    const {productsArray, itemsInCart, cartItems} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.appBarContainer}>
          <View style={styles.appBarLeft}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="menu" size={25} />
            </TouchableOpacity>
            <Image source={imagePath.ic_logo} style={styles.logoStyle} />
            <View style={{marginLeft: 4}}>
              <Text style={{marginBottom: -3, fontSize: 12}}>Become</Text>
              <Text style={styles.appBarText}>INSIDER</Text>
            </View>
          </View>
          <View style={styles.appBarRight}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="magnify"
                size={25}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="bell-outline"
                size={25}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="heart-outline"
                size={25}
                style={styles.iconSpacing}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Cart', {
                  cartProducts: cartItems,
                })
              }>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={25}
                style={[styles.iconSpacing]}
              />
              {itemsInCart > 0 && (
                <View
                  style={{
                    backgroundColor: '#FF406C',
                    width: 16,
                    borderRadius: 30,
                    alignItems: 'center',
                    position: 'absolute',
                    right: 10,
                  }}>
                  <Text style={{color: '#fff', fontSize: 12}}>
                    {itemsInCart}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* <View>
        <Carousel
            ref={(c) => {this._carousel = c; }}
              data={this.state.imageCarousel}
              renderItem={this._renderItem}
              itemWidth={350}
              sliderWidth={360}
              onSnapToItem={index => this.carouselIndexChangeHandler(index)}
            />
        </View> */}
        {/* <View>
            <Text>{this.props.cartCount}</Text>
        </View> */}
        <Text style={styles.headingStyle}>CASUAL SHOES</Text>
        <FlatList
          keyExtractor={(item) => item.id}
          data={productsArray}
          renderItem={this.renderItem}
          numColumns="2"
          style={{marginBottom: 95}}
        />
        
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        // carouselImage: state.carouselImage,
        cartCount: state.cartCount
    }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {},
  appBarContainer: {
    padding: 10,
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
    resizeMode: 'contain'
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
  },
  productNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountedPriceStyle: {
    fontWeight: 'bold',
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
});

