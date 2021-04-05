import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import colors from '../styles/colors';

export default class FloatingButton extends Component {
  render() {
    // console.log(this.props);
    const {containerStyle, imageStyle, imageSrc} = this.props;
    return (
      <TouchableOpacity
        style={containerStyle}
        activeOpacity={0.5}
        onPress={() => this.props.onClick('', false)}>
        <Image source={imageSrc} style={imageStyle} tintColor={colors.white} />
      </TouchableOpacity>
    );
  }
}
