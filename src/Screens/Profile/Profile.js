import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
import {connect} from 'react-redux';
import navigationStrings from '../../constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  openCamera = () => {
    ImagePicker.openCamera({
      width: 80,
      height: 100,
    })
      .then(image => {
        this.setState({
          profileImage: image.path,
        });
        this.setModalVisible();
        console.log(image);
      })
      .catch(err => {
        console.log(err);
        this.setModalVisible();
      });
  };

  openGallery = () => {
    ImagePicker.openPicker({
      width: 80,
      height: 100,
    })
      .then(image => {
        this.setState({
          profileImage: image.path,
        });
        this.setModalVisible();
        console.log(image);
      })
      .catch(err => {
        console.log(err);
        this.setModalVisible();
      });
  };

  removeData = () => {
    try {
      AsyncStorage.removeItem('userData');
      console.log('successfully deleted data from Async Storage');
    } catch (error) {
      console.log('could not delete data from Async Storage ', error);
    }
  };

  logOut = () => {
    this.removeData();
    actions.logout();
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={{paddingHorizontal: 8}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={this.openCamera}>
                <Image
                  source={imagePath.ic_camera}
                  style={{height: 50, width: 50, marginRight: 14}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.openGallery}>
                <Image
                  source={imagePath.ic_gallery}
                  style={{height: 50, width: 50, marginTop: 4}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.appBarContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="menu"
                color={colors.themeDarkGreen}
                size={30}
              />
            </TouchableOpacity>
            <Image source={imagePath.logo} style={styles.logoStyle} />
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
                <View style={styles.cartCountStyle}>
                  <Text style={{color: '#fff', fontSize: 12}}>
                    {this.props.cartCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileCardContainer}>
          <View
            style={{
              backgroundColor: '#fff',
              elevation: 5,
              paddingVertical: 16,
              paddingHorizontal: 4,
              borderRadius: 4,
            }}>
            <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
              <TouchableOpacity onPress={this.setModalVisible}>
                <Image
                  source={imagePath.profile}
                  style={{height: 50, width: 50, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <View
                style={{paddingHorizontal: 8, justifyContent: 'flex-start'}}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
                  Surjit Kumar
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="phone-in-talk"
                      size={20}
                      color={colors.themeGreen}
                    />
                    <Text style={{fontSize: 13}}>9056167932</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={colors.themeGreen}
                    />
                    <Text style={{fontSize: 13}}>surjit9464@gmail.com</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={{
            color: '#909BB0',
            fontWeight: 'bold',
            fontSize: 20,
            paddingHorizontal: 8,
          }}>
          Quick Links
        </Text>
        <View style={styles.quickLinksBox}>
          <TouchableOpacity
            style={[
              styles.singleLinkBox,
              {borderBottomWidth: 0.5, borderBottomColor: '#c5c5c5'},
            ]}>
            <View style={styles.quickLinkImage}>
              <Image
                source={imagePath.box}
                style={{height: 22, width: 25, resizeMode: 'contain'}}
                tintColor="#fff"
              />
            </View>
            <Text style={styles.quickLinkTextStyle}>My Orders</Text>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.singleLinkBox,
              {borderBottomWidth: 0.5, borderBottomColor: '#c5c5c5'},
            ]}>
            <View style={styles.quickLinkImage}>
              <Image
                source={imagePath.calendar_blank}
                style={{height: 22, width: 25, resizeMode: 'contain'}}
                tintColor="#fff"
              />
            </View>
            <Text style={styles.quickLinkTextStyle}>My Appointments</Text>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singleLinkBox}>
            <View style={styles.quickLinkImage}>
              <Image
                source={imagePath.bell}
                style={{height: 22, width: 25, resizeMode: 'contain'}}
                tintColor="#fff"
              />
            </View>
            <Text style={styles.quickLinkTextStyle}>Reminders</Text>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singleLinkBox}>
            <View style={styles.quickLinkImage}>
              <Image
                source={imagePath.logout}
                style={{height: 22, width: 25, resizeMode: 'contain'}}
                tintColor="#fff"
              />
            </View>
            <Text style={styles.quickLinkTextStyle} onPress={this.logOut}>
              Log Out
            </Text>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  appBarContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoStyle: {
    width: '55%',
    resizeMode: 'contain',
    height: 50,
    marginLeft: 8,
  },
  cartCountStyle: {
    backgroundColor: '#265164',
    width: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: -6,
  },
  profileCardContainer: {
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: '#F5F6F8',
  },
  quickLinksBox: {
    backgroundColor: '#fff',
    paddingVertical: 4,
    elevation: 5,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  singleLinkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 12,
  },
  quickLinkImage: {
    backgroundColor: colors.themeDarkGreen,
    padding: 6,
    paddingLeft: 8,
    paddingRight: 4,
    borderRadius: 8,
    flex: 0.1,
  },
  quickLinkTextStyle: {
    flex: 0.8,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 16,
  },
});
