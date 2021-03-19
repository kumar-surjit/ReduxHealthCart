import React from 'react';
import {TextInput, View} from 'react-native';

export default function InputText(props) {
  const {placeholder, style, containerStyle} = props;
  return (
    <View style={containerStyle}>
      <TextInput placeholder={placeholder} style={style} autoFocus={true} />
    </View>
  );
}
