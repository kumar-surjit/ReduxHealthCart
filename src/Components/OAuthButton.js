import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OAuthButton(props) {
  const {iconName, color, label} = props;
  return (
    <View
      style={{alignSelf: 'center', flexDirection: 'row', alignItems: 'center'}}>
      <MaterialCommunityIcons name={iconName} size={25} color={color} />
      <Text style={{marginLeft: 8, fontSize: 18, color: color}}>{label}</Text>
    </View>
  );
}
