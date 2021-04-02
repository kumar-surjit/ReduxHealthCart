import {StyleSheet, Dimensions} from 'react-native';
import {getColors} from '../../styles/colors';

export function getStyleSheet(mainColor) {
  const colors = getColors(mainColor);
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      backgroundColor: colors.themeGreen,
      paddingVertical: 12,
      alignItems: 'center',
    },
    headerTextStyle: {
      color: colors.themeWhite,
      fontSize: 16,
      fontFamily: 'Nunito-SemiBold',
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
    searchTextStyle: {
      textAlign: 'center',
      color: colors.themeWhite,
      fontFamily: 'Nunito-Bold',
      fontSize: 20,
    },
  });
}
