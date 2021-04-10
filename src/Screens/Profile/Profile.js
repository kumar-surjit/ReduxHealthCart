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
import {getColors} from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
import {connect} from 'react-redux';
import navigationStrings from '../../constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../../constants/lang';
import ThemeCard from '../../Components/ThemeCard';
import {getStyleSheet} from './styles';
import QRCode from 'react-native-qrcode-svg';

class Profile extends Component {
  state = {
    modalVisible: false,
    cardColors: ['Green', 'Blue'],
    qrModalVisible: false,
  };

  setModalVisible = () => {
    const {modalVisible} = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  };

  setQrVisible = () => {
    const {qrModalVisible} = this.state;
    this.setState({
      qrModalVisible: !qrModalVisible,
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

  changeTheme = (newVal, id) => {
    actions.changeTheme(newVal, id);
  };

  logOut = () => {
    this.removeData();
    actions.logout();
  };

  render() {
    const {modalVisible, cardColors, qrModalVisible} = this.state;
    const styles = getStyleSheet(this.props.themeColor);
    const colors = getColors(this.props.themeColor);
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={qrModalVisible}
          onRequestClose={() => {
            this.qrModalVisible(!qrModalVisible);
          }}>
          <View style={styles.centeredView}>
            <QRCode
              //QR code value
              value="Surjit Kumar Profile"
              //size of QR Code
              size={250}
            />
          </View>
        </Modal>
        <View style={styles.appBarContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="menu"
                color={colors.themeGreen}
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
                color={colors.themeGreen}
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
                  <Text style={{color: colors.white, fontSize: 12}}>
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
              backgroundColor: colors.white,
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
                    {strings.PROFILE_NAME}
                  </Text>
                  <TouchableOpacity activeOpacity={0.5}>
                    <MaterialCommunityIcons name="qrcode" size={22} />
                  </TouchableOpacity>
                </View>
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
                    <Text style={{fontSize: 13}}>{strings.PHONE_NO}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={colors.themeGreen}
                    />
                    <Text style={{fontSize: 13}}>{strings.EMAIL}</Text>
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
          {strings.CHANGE_THEME}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 16,
          }}>
          {cardColors.map((item, index) => {
            // console.log(index)
            return (
              <ThemeCard label={item} id={index} onPress={this.changeTheme} />
            );
          })}
        </View>
        <Text
          style={{
            color: '#909BB0',
            fontWeight: 'bold',
            fontSize: 20,
            paddingHorizontal: 8,
          }}>
          {strings.QUICK_LINKS}
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
                tintColor={colors.white}
              />
            </View>
            <Text style={styles.quickLinkTextStyle}>{strings.MY_ORDERS}</Text>
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
                tintColor={colors.white}
              />
            </View>
            <Text style={styles.quickLinkTextStyle}>
              {strings.MY_APPOINTMENTS}
            </Text>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.singleLinkBox,
              {borderBottomWidth: 0.5, borderBottomColor: '#c5c5c5'},
            ]}
            onPress={() =>
              this.props.navigation.navigate(navigationStrings.QrScanner)
            }>
            <View style={styles.quickLinkImage}>
              <Image
                source={imagePath.bell}
                style={{height: 22, width: 25, resizeMode: 'contain'}}
                tintColor={colors.white}
              />
            </View>
            <Text style={styles.quickLinkTextStyle}>{strings.REMINDERS}</Text>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.singleLinkBox}>
            <View style={styles.quickLinkImage}>
              <Image
                source={imagePath.logout}
                style={{height: 22, width: 25, resizeMode: 'contain'}}
                tintColor={colors.white}
              />
            </View>
            <Text style={styles.quickLinkTextStyle} onPress={this.logOut}>
              {strings.LOG_OUT}
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
    themeColor: state.homeReducer.themeColor,
  };
};

const mapDispatchToProps = dispatch => ({
  addToCart: product => dispatch(actions.addToCart(product)),
  addQuantity: id => dispatch(actions.addQuantity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
