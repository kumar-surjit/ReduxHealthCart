import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WrapperComponent from '../../Components/WrapperContainer';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  title: {textAlign: 'center', fontSize: 30, fontWeight: 'bold'},
  subHeading: {
    textAlign: 'center',
    color: '#8F969B',
    fontWeight: '500',
    marginTop: 8,
    fontSize: 18,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    borderRadius: 25,
    lineHeight: 48,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#00C0BF',
    color: '#fff',
  },
  focusCell: {
    borderColor: '#000',
  },
});
function App({navigation}) {
  const CELL_COUNT = 5;

  const [state, setState] = useState({
    timer: 100,
    otp: '',
  });

  const updateState = data => setState(state => ({...state, ...data}));
  //TO SHOW THE TIMER SO THAT USER HAS TO WAIT FOR A WHILE BEFORE REQUSTING A NEW OTP AND HE DON'T KEEP ON REQUESTING OTP AGAIN AND AGAIN
  useEffect(() => {
    let timerId;
    if (timer > 0) {
      timerId = setTimeout(() => {
        updateState({timer: timer - 1});
      }, 1000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [state.timer]);

  //RESTING THE TIMER AND REQUEST FOR NEW OTP
  const _onResend = () => {
    updateState({timer: 120});
  };

  const onChangeOtp = otp => {
    updateState({otp});
  };
  //THIS ARE DEFAULT METHOD REQUIRED BY OTP MODULE TO WORK PROPERLY INCASE MOVE FROM ON BOX TO ANOTHER OR INCASE OF BLUR
  const ref = useBlurOnFulfill({otp: state.otp, cellCount: CELL_COUNT});
  const [propsOtp = props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: state.otp,
    setValue: onChangeOtp,
  });

  const onVerifyOtp = () => {
    const {otp} = state;
    alert(otp);
  };

  const {timer} = state;

  function otpTimerCounter(seconds) {
    // alert(seconds)
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return `${m}:${s}`;
  }
  return (
    <WrapperComponent>
      <TouchableOpacity
        style={{flex: 0.1, marginTop: 16}}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={35} />
      </TouchableOpacity>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>Verify your{'\n'}Phone number</Text>
        <Text style={styles.subHeading}>Enter your OTP code here</Text>
      </View>
      <View style={{flex: 0.2}}>
        <CodeField
          ref={ref}
          {...propsOtp}
          value={state.otp}
          onChangeText={onChangeOtp}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#00C0BF',
          paddingVertical: 16,
          borderRadius: 16,
          marginBottom: 16,
        }}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          CONFIRM
        </Text>
      </TouchableOpacity>
      {timer > 0 ? (
        <View style={{flex: 0.1}}>
          <Text style={[styles.subHeading, {color: '#8F969B'}]}>
            RESEND CODE{' '}
            <Text
              style={{
                color: '#00C0BF',
              }}>
              {`${otpTimerCounter(timer)} min`}
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <Text style={[styles.subHeading, {color: '#8F969B'}]}>
            Didn't get OTP?
            <Text
              onPress={_onResend}
              style={{
                color: '#00C0BF',
              }}>
              {' '}
              RESEND CODE
            </Text>
          </Text>
        </View>
      )}
    </WrapperComponent>
  );
}

export default App;
