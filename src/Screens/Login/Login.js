import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import InputTextWithLabel from '../../Components/InputTextWithLabel';
import AuthButton from '../../Components/AuthButton';
import OAuthButton from '../../Components/OAuthButton';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage, hideMessage} from 'react-native-flash-message';
import actions from '../../redux/actions';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    number: undefined,
    isSecure: true,
    isLoading: false,
  };

  changeState = (stateVar, newValue) => {
    // console.log('inside changeState', stateVar === 'name');
    switch (stateVar) {
      case 'email':
        // console.log('this is newValue:', newValue);
        this.setState({
          email: newValue,
        });
        break;
      case 'password':
        // console.log('this is newValue:', newValue);
        this.setState({
          password: newValue,
        });
        break;
      case 'number':
        // console.log('this is newValue:', newValue);
        this.setState({
          number: newValue,
        });
        break;
    }
  };

  checkValidity = () => {
    const {email, password, number} = this.state;
    console.log(email, password, number);
    let data = {
      contactDetails: {
        phoneNo: number,
        countryCode: '+91',
        countryCodeISO: 'IN',
      },
    };
    console.log(number.length);
    if (email != '' && password !== '' && number.length === 10) {
      this.setState({isLoading: true});
      // this.props.navigation.navigate(navigationStrings.OtpVerification, {userId: "some_user_id", data: data});
      actions
        .logInOTP(data)
        .then(res => {
          this.setState({isLoading: false});
          // console.log(res);
          this.props.navigation.navigate(navigationStrings.OtpVerification, {
            userId: res.data.userId,
            data: data,
          });
        })
        .catch(err => {
          this.setState({isLoading: false});
          showMessage({
            message: "Couldn't login",
            description: 'Please try again',
            type: 'danger',
          });
          console.log(err);
        });
      console.log('Valid', data);
    } else {
      showMessage({
        message: 'Invalid Details',
        description: 'Please check the entered fields',
        type: 'danger',
      });
      console.log('Not Valid');
    }
  };

  render() {
    const {isLoading} = this.state;
    return (
      <WrapperContainer isLoading={isLoading} style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Log In</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: colors.anotherLightGray, height: 1.5}} />
        <View style={styles.contentContainer}>
          <View style={{marginVertical: 15}}>
            <InputTextWithLabel
              placeholder={strings.ENTER_EMAIL}
              style={styles.inputTextStyle}
              focus={false}
              type="email"
              changeState={this.changeState}
            />
            <InputTextWithLabel
              placeholder={strings.ENTER_PASSWORD}
              style={[styles.inputTextStyle, {marginTop: 16}]}
              focus={false}
              type="password"
              secure={true}
              changeState={this.changeState}
            />
            <InputTextWithLabel
              placeholder={strings.ENTER_PHONE}
              style={[styles.inputTextStyle, {marginTop: 16}]}
              focus={false}
              type="number"
              secure={false}
              changeState={this.changeState}
              keyboardType="numeric"
              maxLength={10}
            />
            <View style={styles.helpTextStyle}>
              {/* <Text style={{color: '#929292'}}>Show Password</Text> */}
              <TouchableOpacity>
                <Text style={{color: colors.otherGray}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <AuthButton
              label="Log In"
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
              onPress={this.checkValidity}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.lineStyle} />
              <Text
                style={{
                  fontSize: 18,
                  color: colors.otherGray,
                  fontWeight: 'bold',
                  marginHorizontal: 4,
                }}>
                OR
              </Text>
              <View style={styles.lineStyle} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <TouchableOpacity
                // style={[
                //   styles.oAuthButtonStyle,
                //   {
                //     borderColor: colors.darkBlue,
                //     marginRight: 12,
                //   },
                // ]}
                style={{flex: 0.4, marginRight: 20}}>
                {/* <OAuthButton
                  iconName="facebook"
                  color={colors.darkBlue}
                  label="Facebook"
                /> */}
                <LoginButton
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        console.log(data.accessToken.toString());
                      });
                    }
                  }}
                  onLogoutFinished={() => console.log('logout.')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.oAuthButtonStyle,
                  {borderColor: colors.darkRed},
                ]}>
                <OAuthButton
                  iconName="google-plus"
                  color={colors.darkRed}
                  label="Google"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                {strings.NEW_TO_HEALTHKART}{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.SignUp)
                }>
                <Text style={{color: colors.themeGreen, fontSize: 16}}>
                  {strings.SIGN_UP}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </WrapperContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.white,
  },
  inputTextStyle: {
    borderColor: colors.themeGreen,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 25,
  },

  buttonStyle: {
    backgroundColor: colors.themeGreen,
    paddingVertical: 15,
    marginTop: 32,
    borderRadius: 4,
  },
  inputContainerStyle: {
    marginVertical: 16,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  helpTextStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 15,
  },
  buttonTextStyle: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lineStyle: {
    backgroundColor: colors.otherGray,
    height: 1,
    flex: 0.4,
  },
  oAuthButtonStyle: {
    flex: 0.5,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
