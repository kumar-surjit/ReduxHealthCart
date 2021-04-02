import React from 'react';
import {TextInput, View} from 'react-native';

export default function InputTextWithLabel(props) {
  const {
    placeholder,
    style,
    containerStyle,
    focus,
    type,
    secure,
    keyboardType,
    maxLength,
  } = props;
  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        style={style}
        autoFocus={focus}
        onChangeText={value => props.changeState(type, value)}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}
