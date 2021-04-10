import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperContainer from '../../Components/WrapperContainer';
import colors, {getColors} from '../../styles/colors';
import {getStyleSheet} from './styles';
import actions from '../../redux/actions';
import {getTimeFromMilli} from '../../utils/helperFunctions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import navigationStrings from '../../constants/navigationStrings';

const LIMIT = 10;
const {width, height} = Dimensions.get('window');
class Messages extends Component {
  state = {
    allChats: [
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      //   commonConversationId: '606eb5f5554b162f621a4db6',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
      // {
      //   profilePic:
      //     'https://talktier.s3-us-east-2.amazonaws.com/User/profilePicture/Main_161778261411211431.png',
      //   userName: 'Gulshan',
      //   lastMessage: 'Hello',
      //   time: '6:24 PM',
      // },
    ],
    isLoading: false,
  };

  getData = (onEndReached = true) => {
    // ?limit=20&skip=0
    const {allChats, isLoading} = this.state;
    this.setState({isLoading: true});
    let skip = onEndReached ? allChats.length : 0;
    let query = `?limit=${LIMIT}&skip=${skip}`;
    console.log('QUERY: ', query);
    actions
      .getConversations(query)
      .then(res => {
        console.log('RESPONSE: ', res);
        let chatList = [];
        res.data.forEach(val => {
          let item = {
            profilePic: val.userInfo.profileImg[0].original,
            userName: val.userInfo.firstName,
            lastMessage: val.lastMessage[0].text,
            time: getTimeFromMilli(val.lastMessage[0].createdDateMili),
            commonConversationId: val.commonConversationId,
            id: val._id,
          };
          chatList.push(item);
        });
        let updatedList = [];
        if (onEndReached) {
          updatedList = [...allChats, ...chatList];
        } else {
          updatedList = [...chatList];
        }
        console.log(updatedList);
        this.setState({
          allChats: updatedList,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log('ERROR: ', err);
        this.setState({
          isLoading: false,
        });
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  _renderItem = ({item, index}) => {
    const styles = getStyleSheet(this.props.themeColor);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.5}
        onPress={() =>
          this.props.navigation.navigate(navigationStrings.ChatRoom, {item})
        }>
        <Image source={{uri: item.profilePic}} style={styles.imageStyle} />
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <View style={{...styles.itemTextContainer, marginBottom: 4}}>
            <Text style={styles.itemUserNameText}>{item.userName}</Text>
            <Text style={styles.itemTimeText}>{item.time}</Text>
          </View>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemMessageText}>{item.lastMessage}</Text>
            <View>
              <Text style={styles.countTextStyle}>1</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {allChats, isLoading} = this.state;
    const {themeColor} = this.props;
    const styles = getStyleSheet(themeColor);
    return (
      <WrapperContainer isLoading={isLoading}>
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            name="message-outline"
            color={colors.white}
            size={25}
          />
          <Text style={styles.headerText}>Messages</Text>
        </View>
        <FlatList
          data={allChats}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: colors.lightGreyBorder,
                width: 0.7 * width,
                alignSelf: 'flex-end',
                marginRight: 26,
              }}
            />
          )}
        />
      </WrapperContainer>
    );
  }
}

const mapStateToProps = state => {
  return {themeColor: state.homeReducer.themeColor};
};

export default connect(mapStateToProps)(Messages);
