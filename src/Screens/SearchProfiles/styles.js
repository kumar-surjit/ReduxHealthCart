import {StyleSheet, Dimensions} from 'react-native';
import {getColors} from '../../styles/colors';

export function getStyleSheet(mainColor) {
  const colors = getColors(mainColor);
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchBoxStyle: {
      backgroundColor: colors.themeGreen,
      color: colors.themeWhite,
      fontFamily: 'Nunito-Bold',
      fontSize: 20,
      flex: 0.8,
      borderRadius: 30,
      paddingHorizontal: 30,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: colors.themeWhite,
      borderRadius: 8,
      width: Dimensions.get('window').width / 2.3,
      marginVertical: 12,
      marginHorizontal: 12,
      paddingBottom: 16,
      elevation: 4,
    },
    itemTextContainer: {
      backgroundColor: colors.themeWhite,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: 16,
      paddingTop: 4,
    },
    loaderContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
