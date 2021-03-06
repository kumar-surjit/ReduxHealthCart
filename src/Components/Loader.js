import React from 'react';
import {View, Modal} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import colors from '../styles/colors';

const LoadingComponent = () => (
  <View
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      elevation: 5,
    }}>
    <BarIndicator size={25} color={colors.themeGreen} />
  </View>
);
const Loader = ({isLoading = false, withModal}) => {
  if (withModal) {
    return (
      <Modal transparent visible={isLoading}>
        <LoadingComponent />
      </Modal>
    );
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  return null;
};

export default Loader;
