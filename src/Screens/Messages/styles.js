import {StyleSheet} from 'react-native';
import {getColors} from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';

export function getStyleSheet(themeColor) {
  const colors = getColors(themeColor);
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.themeGreen,
    },
    headerText: {
      fontSize: 20,
      marginLeft: 8,
      color: colors.white,
      fontFamily: fontFamily.Nunito_Bold,
    },
    itemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 30,
    },
    itemTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemUserNameText: {fontSize: 16, fontFamily: fontFamily.Nunito_Bold},
    itemTimeText: {
      color: colors.grayOpacity50,
      fontFamily: fontFamily.Nunito_Regular,
      fontSize: 12,
    },
    itemMessageText: {
      color: colors.grayOpacity90,
      fontFamily: fontFamily.Nunito_Regular,
    },
    countTextStyle: {
      backgroundColor: colors.themeGreen,
      borderRadius: 30,
      minWidth: 16,
      textAlign: 'center',
      color: colors.white,
      fontSize: 12,
    },
  });
}
