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
import Geolocation from 'react-native-geolocation-service';
import {locationPermission} from '../../utils/permissions';
import FloatingButton from '../../Components/FloatingButton';
import imagePath from '../../constants/imagePath';

class SearchProfiles extends Component {
  state = {
    profiles: [],
    isLoading: false,
    handler: undefined,
    latitude: null,
    longitude: null,
  };

  getCurrentLocation = hasLocationPermission => {
    // console.log(hasLocationPermission);
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  componentDidMount() {
    locationPermission()
      .then(res => {
        console.log(res);
        this.getCurrentLocation(res === 'granted');
      })
      .catch(err => {
        console.log(err);
      });
  }

  startTimer = (counter, val) => {
    if (counter === 200) {
      console.log('200 MilliSeconds passed' + val);
      if (val !== '') this.makeRequest(val, true);
      else {
        this.setState({profiles: []});
      }
      return;
    } else {
      counter = counter + 100;
      this.setState({
        handler: setTimeout(() => this.startTimer(counter, val), 100),
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

  makeRequest = (val, isSearch) => {
    const {longitude, latitude} = this.state;
    if (!isSearch) this.setState({isLoading: true});
    let locationQuery = `coordinates=[${longitude}, ${latitude}]`;
    let nameParams = 'name=' + val;
    let queryParams = '?' + (isSearch ? nameParams : locationQuery);
    console.log(queryParams);
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
    // console.log('LOCATION: ', this.state.longitude, this.state.latitude);
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
          {isLoading && (
            <View style={styles.loaderContainer}>
              <MaterialIndicator color={colors.themeGreen} />
            </View>
          )}
        </View>
        <FlatList
          data={profiles}
          keyExtractor={item => item._id}
          renderItem={this._renderItem}
          bounces={false}
          numColumns={2}
        />
        <FloatingButton
          containerStyle={styles.containerStyle}
          imageStyle={styles.imageStyle}
          imageSrc={imagePath.nearby_profiles}
          onClick={this.makeRequest}
        />
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
