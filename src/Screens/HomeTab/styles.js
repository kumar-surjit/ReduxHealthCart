import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
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
  logoImage: {
    width: '55%',
    resizeMode: 'contain',
    height: 50,
    marginLeft: 8,
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
  flashHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#ececec',
  },
  viewAllStyle: {backgroundColor: '#fff', borderRadius: 4, padding: 8},
  quantityOperationContainer: {
    borderWidth: 1,
    paddingHorizontal: 6,
    backgroundColor: '#29646d',
  },
  cartCountContainer: {
    backgroundColor: '#265164',
    width: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: -6,
  },
  productContainer: {
    backgroundColor: colors.white,
    marginRight: 8,
    elevation: 4,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginLeft: 4,
    width: Dimensions.get('window').width / 2.4,
  },
  productHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 8,
  },
  productDiscountContainer: {
    borderColor: 'red',
    borderWidth: 1,
    color: 'red',
    alignSelf: 'flex-end',
    padding: 2,
    textAlign: 'center',
  },
  addCartButton: {
    flexDirection: 'row',
    backgroundColor: '#29646d',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  productQuantityStyle: {
    paddingHorizontal: 4,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});
