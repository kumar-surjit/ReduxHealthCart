import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import colors from '../styles/colors';
import imagePath from '../constants/imagePath';

class ThemeCard extends React.Component {
  render() {
    // console.log(this.props.label.toLowerCase());
    return (
      <TouchableOpacity
        style={styles.cardStyle}
        activeOpacity={0.7}
        onPress={() =>
          this.props.onPress(this.props.label.toLowerCase(), this.props.id)
        }>
        <Text>{this.props.label}</Text>
        {this.props.id === this.props.selectedIndex && (
          <Image
            source={imagePath.ic_selected}
            style={{
              width: 20,
              height: 20,
              marginLeft: 4,
              resizeMode: 'contain',
            }}
            tintColor={this.props.themeColor}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.homeReducer.themeColor,
    selectedIndex: state.homeReducer.selectedIndex,
  };
};

export default connect(mapStateToProps)(ThemeCard);

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    elevation: 5,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    width: Dimensions.get('window').width / 2.3,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'space-between',
  },
});
