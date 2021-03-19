import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../styles/colors';
import InputText from '../../Components/InputText';
import AuthButton from '../../Components/AuthButton';
import OAuthButton from '../../Components/OAuthButton';

export default class Login extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Log In</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#b8b8b8', height: 1.5}} />
        <View style={styles.contentContainer}>
          <View style={{marginVertical: 15}}>
            <InputText
              placeholder="Enter your phone no"
              style={styles.inputTextStyle}
              containerStyle={styles.inputContainerStyle}
            />
            <InputText
              placeholder="Enter Password"
              style={styles.inputTextStyle}
            />
            <View style={styles.helpTextStyle}>
              <Text style={{color: '#929292'}}>Show Password</Text>
              <TouchableOpacity>
                <Text style={{color: '#929292'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <AuthButton
              label="Log In"
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
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
            <Text style={{fontSize: 16, textAlign: 'center', marginTop: 20}}>
              New to HealthKart?{' '}
              <Text style={{color: colors.themeGreen}}>Sign Up</Text>
            </Text>
          </View>
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
  inputTextStyle: {
    borderColor: colors.themeGreen,
    borderWidth: 2,
    borderRadius: 40,
    paddingHorizontal: 25,
  },
  inputContainerStyle: {
    marginVertical: 15,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  helpTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 15,
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
