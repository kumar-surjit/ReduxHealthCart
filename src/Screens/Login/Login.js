import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import InputText from '../../Components/InputText';
import AuthButton from '../../Components/AuthButton';
import OAuthButton from '../../Components/OAuthButton';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage, hideMessage} from 'react-native-flash-message';
import actions from '../../redux/actions';
import WrapperContainer from '../../Components/WrapperContainer';

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
    let data = { "contactDetails": {
      "phoneNo": number,
      "countryCode": "+91",
      "countryCodeISO": "IN"
      }
    };
    console.log(number.length)
    if (email != '' && password !== '' && number.length === 10) {
      this.setState({isLoading: true});
          // this.props.navigation.navigate(navigationStrings.OtpVerification, {userId: "some_user_id", data: data});
          actions.logInOTP(data)
        .then((res) => {
          this.setState({isLoading: false});
          // console.log(res);
          this.props.navigation.navigate(navigationStrings.OtpVerification, {userId: res.data.userId, data: data});
        })
        .catch((err) => {
          this.setState({isLoading: false});
          showMessage({
            message: "Couldn't login",
            description: 'Please try again',
            type: 'danger',
          });
          console.log(err);
        })
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
        <View style={{backgroundColor: '#b8b8b8', height: 1.5}} />
        <View style={styles.contentContainer}>
          <View style={{marginVertical: 15}}>
            <InputText
              placeholder="Enter Email"
              style={styles.inputTextStyle}
              focus={false}
              type="email"
              changeState={this.changeState}
            />
            <InputText
              placeholder="Enter Password"
              style={[styles.inputTextStyle, {marginTop: 16}]}
              focus={false}
              type="password"
              secure={true}
              changeState={this.changeState}
            />
            <InputText
              placeholder="Enter Phone no"
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
                <Text style={{color: '#929292'}}>Forgot Password?</Text>
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
                  color: '#929292',
                  fontWeight: 'bold',
                  marginHorizontal: 4,
                }}>
                OR
              </Text>
              <View style={styles.lineStyle} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <TouchableOpacity
                style={[
                  styles.oAuthButtonStyle,
                  {
                    borderColor: '#2D4690',
                    marginRight: 12,
                  },
                ]}>
                <OAuthButton
                  iconName="facebook"
                  color="#2D4690"
                  label="Facebook"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.oAuthButtonStyle, {borderColor: '#E53138'}]}>
                <OAuthButton
                  iconName="google-plus"
                  color="#E53138"
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
                New to HealthKart?{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.SignUp)
                }>
                <Text style={{color: colors.themeGreen, fontSize: 16}}>
                  Sign Up
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
    backgroundColor: '#fff',
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
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lineStyle: {
    backgroundColor: '#929292',
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
