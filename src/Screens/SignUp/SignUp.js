import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import actions from '../../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import InputTextWithLabel from '../../Components/InputTextWithLabel';
import AuthButton from '../../Components/AuthButton';
import OAuthButton from '../../Components/OAuthButton';
import navigationStrings from '../../constants/navigationStrings';
import {showMessage, hideMessage} from 'react-native-flash-message';
import store from '../../redux/store';

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    isSecure: true,
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
      case 'name':
        // console.log('this is newValue:', newValue);
        this.setState({
          name: newValue,
        });
        break;
    }
  };

  checkValidity = () => {
    const {email, password, name} = this.state;
    console.log(email, password, name);
    let data = {
      email: email,
      languageCode: 'EN',
      signupType: 'APP',
      password: password,
      name: name,
    };
    if (email !== '' || password !== '' || name !== '') {
      this.signUpUser(data);
      console.log('Valid');
    } else {
      showMessage({
        message: 'Invalid Details',
        description: 'Please check the entered fields',
        type: 'danger',
      });
      console.log('Not Valid');
    }
  };

  signUpUser = value => {
    console.log('inside signup user');
    // this.props.navigation.navigate(navigationStrings.HomeTab)
    actions
      .signUp(value)
      .then(res => console.log(res))
      .catch(err => console.log("i'm not here"));
  };

  render() {
    return (
      <View style={{backgroundColor: colors.AuthBgColor, flex: 1}}>
        <View style={styles.headerStyle}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#b8b8b8', height: 1.5}} />
        <View style={styles.contentContainer}>
          <Text style={{marginTop: 16, marginBottom: 20, fontSize: 14}}>
            Your number is safe with us. We won't share your details with
            anyone.
          </Text>
          <InputTextWithLabel
            placeholder="Enter Name"
            style={styles.inputTextStyle}
            containerStyle={styles.inputContainerStyle}
            focus={true}
            type="name"
            changeState={this.changeState}
          />
          <InputTextWithLabel
            placeholder="Enter Email"
            style={[styles.inputTextStyle, {marginTop: 16}]}
            focus={false}
            type="email"
            changeState={this.changeState}
          />
          <InputTextWithLabel
            placeholder="Enter Password"
            style={[styles.inputTextStyle, {marginTop: 16}]}
            focus={false}
            secure={true}
            type="password"
            changeState={this.changeState}
          />
          {/* <InputText
            placeholder="Enter Mobile Number"
            style={styles.inputTextStyle}
            focus={true}
          /> */}
          <AuthButton
            label="Sign Up"
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            onPress={this.checkValidity}
          />
          <Text style={{color: '#919392', marginTop: 15, textAlign: 'center'}}>
            By signing up you agree to our{' '}
            <Text style={{color: colors.themeGreen}}>Terms & Conditions</Text>
          </Text>
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
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(navigationStrings.Login)
              }>
              <Text style={{color: colors.themeGreen, fontSize: 16}}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              signUp()
                .then(res => console.log('this is sign up promsise, '))
                .catch(err => console.log('this is signup promise error: '));
            }}>
            <Text style={styles.buttonTextStyle}>Go to Login</Text>
          </TouchableOpacity> */}
        </View>
      </View>
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
  contentContainer: {
    paddingHorizontal: 15,
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
    marginTop: 40,
    borderRadius: 4,
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
