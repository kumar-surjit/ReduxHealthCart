import {CommonActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';

export default class AuthPage extends Component {
  skipForNow = () => {
    const skipAction = CommonActions.reset({
      index: 0,
      routes: [{name: navigationStrings.Home}],
    });
    this.props.navigation.dispatch(skipAction);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={imagePath.image_bg}
          style={styles.imageBgStyle}>
          <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
            <View style={{marginHorizontal: 50}}>
              <Image
                source={imagePath.logo}
                tintColor="#fff"
                style={styles.logoStyle}
              />
            </View>
            <Text style={styles.logoText}>Kick start your fitness journey</Text>
          </View>
          <View style={{flex: 0.5, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.SignUp)
                }>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.Login)
                }>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.skipForNow}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 64,
                }}>
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageBgStyle: {flex: 1, resizeMode: 'cover', paddingHorizontal: 8},
  logoStyle: {
    height: 100,
    resizeMode: 'contain',
    width: '100%',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 0.5,
    marginHorizontal: 20,
    paddingVertical: 15,
  },
  logoText: {color: '#fff', textAlign: 'center', fontSize: 15},
  buttonText: {textAlign: 'center', fontSize: 16},
});
