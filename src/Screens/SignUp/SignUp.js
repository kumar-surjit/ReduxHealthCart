import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {signUp} from '../../redux/actions/authActions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import InputText from '../../Components/InputText';
import AuthButton from '../../Components/AuthButton';
import OAuthButton from '../../Components/OAuthButton';

export default class SignUp extends Component {
  render() {
    return (
      <View style={{backgroundColor: colors.AuthBgColor, flex: 1}}>
        <View style={styles.headerStyle}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#b8b8b8', height: 1.5}} />
        <View style={styles.contentContainer}>
          <Text style={{marginTop: 16, marginBottom: 20}}>
            Your number is safe with us. We won't share your details with
            anyone.
          </Text>
          <InputText
            placeholder="Enter Mobile Number"
            style={styles.inputTextStyle}
          />
          <AuthButton
            label="Sign Up"
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
          />
          <Text style={{color: '#919392', marginTop: 15, textAlign: 'center'}}>
            By signing up you agree to our{' '}
            <Text style={{color: colors.themeGreen}}>Terms & Conditions</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
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
          <Text style={{fontSize: 16, textAlign: 'center', marginTop: 20}}>
            Already have an account?{' '}
            <Text style={{color: colors.themeGreen}}>Log In</Text>
          </Text>
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
    borderWidth: 2,
    borderRadius: 40,
    paddingHorizontal: 25,
  },

  buttonStyle: {
    backgroundColor: colors.themeGreen,
    paddingVertical: 15,
    marginTop: 40,
    borderRadius: 40,
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
