import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function AuthButton(props) {
  const {label, buttonStyle, buttonTextStyle} = props;
  return (
    <TouchableOpacity style={buttonStyle} onPress={() => props.onPress()}>
      <Text style={buttonTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
}
