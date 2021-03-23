import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import Loader from './Loader';

const WrapperContainer = ({
  children,
  isLoading,
  bgColor = '#fff',
  statusBarColor = '#fff',
  barStyle = 'dark-content',
}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: statusBarColor}}>
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <View style={{backgroundColor: bgColor, flex: 1,}}>
        {children}
      </View>
      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default WrapperContainer;
