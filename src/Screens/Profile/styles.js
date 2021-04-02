import {StyleSheet} from 'react-native';
import {getColors} from '../../styles/colors';

export function getStyleSheet(mainColor) {
  const colors = getColors(mainColor);
  return StyleSheet.create({
    appBarContainer: {
      paddingVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    logoStyle: {
      width: '55%',
      resizeMode: 'contain',
      height: 50,
      marginLeft: 8,
    },
    cartCountStyle: {
      backgroundColor: colors.darkBlue,
      width: 16,
      borderRadius: 30,
      alignItems: 'center',
      position: 'absolute',
      right: 5,
      top: -6,
    },
    profileCardContainer: {
      paddingHorizontal: 8,
      paddingVertical: 20,
      backgroundColor: colors.lightWhite,
    },
    quickLinksBox: {
      backgroundColor: colors.white,
      paddingVertical: 4,
      elevation: 5,
      borderRadius: 8,
      marginHorizontal: 8,
      marginVertical: 16,
    },
    singleLinkBox: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingVertical: 12,
    },
    quickLinkImage: {
      backgroundColor: colors.themeGreen,
      padding: 6,
      paddingLeft: 8,
      paddingRight: 4,
      borderRadius: 8,
      flex: 0.1,
    },
    quickLinkTextStyle: {
      flex: 0.8,
      fontSize: 18,
      fontWeight: 'bold',
      paddingLeft: 16,
    },
  });
}
