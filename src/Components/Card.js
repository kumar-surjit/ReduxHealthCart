import React from 'react';
import {View, Text, Image} from 'react-native';

export default function Card(props) {
  //   console.log(props);
  const {styles, item, index, colors} = props;
  return (
    <View
      style={[
        styles.itemContainer,
        props.isLastSingleItem(index) && {flex: 0.5},
      ]}>
      <Image
        source={{uri: item.profileImg[0].thumbnail}}
        style={{height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8}}
      />
      <View style={styles.itemTextContainer}>
        <Text
          style={{
            color: colors.blackOpacity80,
            fontWeight: 'bold',
            paddingVertical: 4,
            fontSize: 16,
          }}>
          {item.firstName}, {props.getAge(item.dob.fullDate)}
        </Text>
        <Text style={{color: colors.blackOpacity70}}>
          {item.addressDetails.city}
        </Text>
      </View>
    </View>
  );
}
