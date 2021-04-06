import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import WrapperContainer from '../../Components/WrapperContainer';
import {getStyleSheet} from './styles';
import navigationStrings from '../../constants/navigationStrings';
import {getColors} from '../../styles/colors';
import strings from '../../constants/lang';
import {MaterialIndicator} from 'react-native-indicators';
import colors from '../../styles/colors';
import Card from '../../Components/Card';
import {getAge} from '../../utils/helperFunctions';

const LIMIT = '10';

class Profiles extends Component {
  state = {
    skip: 0,
    isLoading: true,
    profiles: [],
    isListEnd: false,
    isLoadingMore: false,
    isNoMoreData: false,
    refreshing: false,
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = (onEndReachCall = false) => {
    const {skip, profiles, isListEnd} = this.state;

    let calcSkip = onEndReachCall ? skip + profiles.length : 0;

    let data = {
      searchType: 'LEADERBOARD',
      limit: LIMIT,
      skip: calcSkip.toString(),
    };
    console.log(data);
    // console.log(header);
    actions
      .getProfiles(data)
      .then(res => {
        // console.log('this is the response: ', res);
        let updatedStateVar = {};
        if (res.data.length > 0) {
          let profilesData = onEndReachCall
            ? [...profiles, ...res.data]
            : res.data;

          updatedStateVar = {
            profiles: profilesData,
          };
        } else {
          updatedStateVar = {
            isListEnd: true,
            isNoMoreData: true,
          };
        }

        this.setState({
          ...updatedStateVar,
          isLoading: false,
          isLoadingMore: false,
          refreshing: false,
        });
      })
      .catch(err => {
        // console.log('this is the error: ', err);
        this.setState({isLoading: false, isLoadingMore: false});
      });
  };

  _onRefresh = () => {
    this.setState({refreshing: true, isNoMoreData: false});
    this.getData();
  };

  isLastSingleItem = index => {
    const {profiles} = this.state;
    return profiles.length - 1 === index && index % 2 === 0;
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

  renderFooter = () => {
    const {isLoadingMore} = this.state;
    if (isLoadingMore) {
      return (
        <View style={{paddingBottom: 40}}>
          <MaterialIndicator color={colors.themeGreen} />
        </View>
      );
    }
    return <View style={{height: 50}} />;
  };

  onEndReached = () => {
    const {isLoadingMore, isNoMoreData} = this.state;

    if (isLoadingMore || isNoMoreData) {
      return;
    }
    this.setState({isLoadingMore: true});
    this.getData(true);
  };
  render() {
    console.log(this.props.profiles);
    const styles = getStyleSheet(this.props.themeColor);
    const colors = getColors(this.props.themeColor);
    // console.log('this is the user data: ');
    const {isLoading, profiles, Data, isLoadingMore, refreshing} = this.state;
    return (
      <WrapperContainer isLoading={isLoading}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{flex: 0.2, flexDirection: 'row', alignItems: 'center'}}
            onPress={() =>
              this.props.navigation.navigate(navigationStrings.HomeTab)
            }>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.themeWhite}
            />
            <Text style={styles.headerTextStyle}>{strings.BACK}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 0.6}}
            activeOpacity={0.5}
            onPress={() =>
              this.props.navigation.navigate(navigationStrings.SearchProfiles)
            }>
            <Text style={styles.searchTextStyle}>{strings.SEARCH}</Text>
          </TouchableOpacity>
          {/* <TextInput
            placeholder={strings.SEARCH}
            style={styles.searchBoxStyle}
            placeholderTextColor={colors.themeWhite}
          /> */}
          <TouchableOpacity
            style={{flex: 0.2, alignItems: 'flex-end', paddingRight: 8}}>
            <MaterialCommunityIcons
              name="filter-outline"
              size={30}
              color={colors.themeWhite}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }
          data={profiles}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          onEndReachedThreshold={0.8}
          onEndReached={this.onEndReached}
          bounces={false}
          ListFooterComponent={this.renderFooter}
        />
      </WrapperContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.authReducer.userData,
    profiles: state.profileReducer.profiles,
    themeColor: state.homeReducer.themeColor,
  };
};

export default connect(mapStateToProps)(Profiles);
