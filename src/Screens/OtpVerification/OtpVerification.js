import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WrapperComponent from '../../Components/WrapperContainer';
import actions from '../../redux/actions';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { showMessage } from 'react-native-flash-message';

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
function App({navigation, route}) {
  const CELL_COUNT = 5;
  const [userId, setUserId] = useState(route.params.userId);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    actions.logInOTP(route.params.data)
    .then((res) => {
      setIsLoading(false);
      updateState({otp: ''});
      setUserId(res.data.userId);
      showMessage({
        message: "Resent OTP",
        description: 'OTP has been resent successfully',
        type: 'success',
      });
      // console.log(res);
    })
    .catch((err) => {
      setIsLoading(false);
      showMessage({
        message: "Couldn't Resend OTP",
        description: 'Please try again',
        type: 'danger',
      });
      console.log(err);
    });
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
  // console.log(route.params);
const sumbit = () => {
  const {otp} = state;
  if(otp.length === 5){
    let data={ 
      "userId": userId,
      "otp" : otp,
      "deviceToken" : "123",
      "registerFrom": Platform.OS.toUpperCase(),
      };
      setIsLoading(true);
      actions.verififyOtp(data)
        .then((res) => {
          setIsLoading(false);
          showMessage({
            message: "Welcome Back",
            description: 'Successfully Logged In',
            type: 'success',
          });
        })
        .catch(err => {
          setIsLoading(false);
          if(err.status !== undefined){
            if(err.status === 400){
              showMessage({
                message: err.message,
                description: 'Please try again',
                type: 'danger',
              });
            }
          } else 
          showMessage({
            message: "Couldn't Verify OTP",
            description: 'Please try again',
            type: 'danger',
          });
        })
  } else{
    showMessage({
      message: 'Incomplete Field',
      description: 'Please enter the full OTP',
      type: 'danger',
    });
  }
  
  // console.log(data);
}

  return (
    <WrapperComponent isLoading={isLoading}>
      <View style={{paddingHorizontal: 16, flex: 1}}>
      <TouchableOpacity
        style={{flex: 0.1, marginTop: 16}}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={35} />
      </TouchableOpacity>
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>Verify your{'\n'}Phone number</Text>
        <Text style={styles.subHeading}>Enter your OTP code here</Text>
      </View>
      <View style={{flex: 0.3}}>
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
        }}
        onPress={sumbit}
        >
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
      </View>
    </WrapperComponent>
  );
}

export default App;
