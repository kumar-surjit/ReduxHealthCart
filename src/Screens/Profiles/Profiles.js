import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import WrapperContainer from '../../Components/WrapperContainer';
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import {StackActions} from '@react-navigation/native';

const LIMIT = '10';

class Profiles extends Component {
  state = {
    skip: 0,
    isLoading: false,
    profiles: [],
    isListEnd: false,
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    const {skip, profiles, isListEnd} = this.state;
    if (!isListEnd) {
      this.setState({isLoading: true});
      let calcSkip = skip + profiles.length;
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
          if (res.data.length > 0) {
            let profilesData = [...profiles, ...res.data];
            this.setState({profiles: profilesData, isLoading: false});
          } else this.setState({isListEnd: true, isLoading: false});
        })
        .catch(err => {
          // console.log('this is the error: ', err);
          this.setState({isLoading: false});
        });
    }
  };

  getAge = dob => {
    let now = new Date();
    let date = new Date(dob);
    const age = now.getFullYear() - date.getFullYear();
    return age;
  };

  _renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.profileImg[0].thumbnail}}
        style={{height: 130}}
      />
      <View style={styles.itemTextContainer}>
        <Text style={{color: 'black', opacity: 0.8, fontWeight: 'bold'}}>
          {item.firstName}
        </Text>
        <Text style={{color: 'black', opacity: 0.7}}>
          Gender, {this.getAge(item.dob.fullDate)}
        </Text>
        <Text style={{color: 'black', opacity: 0.7}}>
          {item.addressDetails.city}
        </Text>
      </View>
    </View>
  );

  render() {
    console.log(this.props.profiles);
    // console.log('this is the user data: ');
    const {isLoading, profiles, Data} = this.state;
    return (
      <WrapperContainer isLoading={isLoading}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{flex: 0.2, flexDirection: 'row', alignItems: 'center'}}
            onPress={() =>
              this.props.navigation.dispatch(
                StackActions.replace(navigationStrings.HomeTab),
              )
            }>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color="#fff"
            />
            <Text style={styles.headerTextStyle}>Back</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.searchBoxStyle}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={{flex: 0.1}}>
            <MaterialCommunityIcons
              name="filter-outline"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={profiles}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          onEndReachedThreshold={0.5}
          onEndReached={this.getData}
        />
      </WrapperContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.authReducer.userData,
    profiles: state.profileReducer.profiles,
  };
};

export default connect(mapStateToProps)(Profiles);
