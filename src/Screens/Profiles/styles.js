import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.themeGreen,
    paddingVertical: 8,
  },
  headerTextStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
  },
  itemContainer: {
    backgroundColor: colors.themeWhite,
    borderRadius: 8,
    width: Dimensions.get('window').width / 2.2,
    marginVertical: 8,
    marginHorizontal: 8,
    paddingBottom: 16,
    elevation: 8,
  },
  itemTextContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  searchBoxStyle: {
    flex: 0.7,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
});
