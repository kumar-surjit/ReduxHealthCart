import React, {Component} from 'react';
import {Text, View, TextInput, FlatList} from 'react-native';
import navigationStrings from '../../constants/navigationStrings';
import {getColors} from '../../styles/colors';
import {getStyleSheet} from './styles';
import strings from '../../constants/lang';
import {connect} from 'react-redux';
import {MaterialIndicator} from 'react-native-indicators';
import actions from '../../redux/actions';
import Card from '../../Components/Card';
import {getAge} from '../../utils/helperFunctions';

class SearchProfiles extends Component {
  state = {
    profiles: [],
    isLoading: false,
    handler: undefined,
  };

  startTimer = (counter, val) => {
    counter = counter + 20;
    if (counter === 40) {
      console.log('50 MilliSeconds passed' + val);
      if (val !== '') this.makeRequest(val);
      else {
        this.setState({profiles: []});
      }
      return;
    } else {
      this.setState({
        handler: setTimeout(() => this.startTimer(counter, val), 20),
      });
    }
    console.log(counter);
  };

  restartTimer = val => {
    clearTimeout(this.state.handler);
    console.log('RESET TIMER');
    this.startTimer(0, val);
  };

  isLastSingleItem = index => {
    const {profiles} = this.state;
    return profiles.length - 1 === index && index % 2 === 0;
  };

  makeRequest = val => {
    let queryParams = '?name=' + val;
    actions
      .searchProfile(queryParams)
      .then(res => {
        console.log('MAKE REQ RESPONSE: ', res);
        this.setState({
          profiles: res.data,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('MAKE REQ ERROR: ', err);
        this.setState({isLoading: false});
      });
  };

  _onChangeText = val => {
    const {handler} = this.state;
    this.setState({isLoading: true});
    if (handler == undefined) {
      this.startTimer(0, val);
    } else if (handler != undefined) {
      this.restartTimer(val);
    }
  };

  _renderItem = ({item, index}) => {
    const styles = getStyleSheet(this.props.themeColor);
    const colors = getColors(this.props.themeColor);
    console.log();
    return (
      <Card
        item={item}
        styles={{
          itemContainer: styles.itemContainer,
          itemTextContainer: styles.itemTextContainer,
        }}
        isLastSingleItem={this.isLastSingleItem}
        index={index}
        colors={colors}
        getAge={getAge}
      />
    );
  };

  render() {
    const styles = getStyleSheet(this.props.themeColor);
    const colors = getColors(this.props.themeColor);
    const {isLoading, profiles} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <TextInput
            placeholder={strings.SEARCH}
            placeholderTextColor={colors.themeWhite}
            style={styles.searchBoxStyle}
            autoFocus={true}
            placeholderTextColor={colors.white}
            onChangeText={this._onChangeText}
          />
        </View>
        <FlatList
          data={profiles}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
          bounces={false}
          numColumns={2}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <MaterialIndicator color={colors.themeGreen} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.homeReducer.themeColor,
  };
};

export default connect(mapStateToProps)(SearchProfiles);
