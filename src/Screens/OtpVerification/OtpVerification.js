import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import GradientButton from '../../Components/GradientButton';
import WrapperContainer from '../../Components/WrapperContainer';
import strings from '../../constants/lang';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../styles/responsiveSize';
import styles from './styles';
import {otpTimerCounter} from '../../utils/helperFunctions';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import imagePath from '../../constants/imagePath';
const CELL_COUNT = 4;
export default function OtpVerification({navigation}) {
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
  return (
    <WrapperContainer>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack(null)}
          style={{alignSelf: 'flex-start'}}>
          <Image source={imagePath.back} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: moderateScaleVertical(88),
          marginHorizontal: moderateScale(24),
        }}>
        <Text style={styles.header}>{strings.OTP_VERIFICATION}</Text>
        <Text style={styles.txtSmall}>{strings.ENTER_OTP_SENT}</Text>
        <View style={{height: moderateScaleVertical(50)}} />
        <CodeField
          ref={ref}
          {...propsOtp}
          value={state.otp}
          onChangeText={onChangeOtp}
          cellCount={CELL_COUNT}
          rootStyle={styles.root}
          blurOnSubmit
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          selectionColor={colors.themeColor}
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <GradientButton
          onPress={onVerifyOtp}
          containerStyle={{marginTop: moderateScaleVertical(10)}}
          btnText={strings.VERIFY_ACCOUNT}
        />
        {timer > 0 ? (
          <View style={styles.bottomContainer}>
            <Text style={{...styles.txtSmall, color: colors.textGreyLight}}>
              {strings.RESEND_CODE_IN}
              <Text
                style={{
                  color: colors.themeColor,
                  fontFamily: fontFamily.futuraBtHeavy,
                }}>
                {`${otpTimerCounter(timer)} min`}
              </Text>
            </Text>
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <Text style={{...styles.txtSmall, color: colors.textGreyLight}}>
              {strings.DIDNT_GET_OTP}
              <Text
                onPress={_onResend}
                style={{
                  color: colors.themeColor,
                  fontFamily: fontFamily.futuraBtHeavy,
                }}>
                {' '}
                {strings.RESEND_CODE}
              </Text>
            </Text>
          </View>
        )}
      </View>
    </WrapperContainer>
  );
}
