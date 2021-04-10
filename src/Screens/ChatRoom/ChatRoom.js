import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../redux/actions';
import {GiftedChat} from 'react-native-gifted-chat';
import WrapperContainer from '../../Components/WrapperContainer';
import {SOCKET_STRINGS} from '../../utils/constants/constants';
import socketServices from '../../utils/socketServices';

const LIMIT = 10;

class ChatRoom extends Component {
  state = {
    allMessages: [],
    isLoading: false,
    commonConversationId: this.props.route.params.item.commonConversationId,
  };

  getData = (onEndReached = true) => {
    // ?limit=20&skip=0
    const {allMessages, isLoading, commonConversationId} = this.state;
    this.setState({isLoading: true});
    let skip = onEndReached ? allMessages.length : 0;
    let query = `?limit=${LIMIT}&skip=${skip}&commonConversationId=${commonConversationId}`;
    console.log('QUERY: ', query);
    actions
      .getMessages(query)
      .then(res => {
        // console.log('RESPONSE: ', res);
        let messageList = [];
        res.data.forEach(val => {
          let item = {
            _id: val._id,
            text: val.text,
            createdAt: new Date(val.createdAt),
            user: {
              _id: val.senderId._id,
              name: val.senderId.firstName,
              avatar: val.senderId.profileImg[0].original,
            },
          };
          // console.log(val.senderId._id);
          messageList.push(item);
        });
        let updatedList = [];
        if (onEndReached) {
          updatedList = [...allMessages, ...messageList];
        } else {
          updatedList = [...messageList];
        }
        console.log('UPDATED LIST: ', updatedList);
        this.setState({
          allMessages: updatedList,
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

  onSend = messages => {
    // console.log(messages);
    const {userData} = this.props;
    const {item} = this.props.route.params;
    socketServices.emit(SOCKET_STRINGS.SEND_MESSAGE, {
      senderId: userData._id,
      recieverId: item.id,
      commonConversationId: item.commonConversationId,
      messageType: 'Text',
      text: messages[0].text,
    });
    this.updateMessages(messages);
  };

  updateMessages = messages => {
    this.setState(prevState => ({
      allMessages: GiftedChat.append(prevState.allMessages, messages),
    }));
  };

  messageReceived = data => {
    console.log(data);
    let message = {
      _id: data._id,
      text: data.text,
      createdAt: new Date(data.createdAt),
      user: {
        _id: data.senderId,
      },
    };
    console.log(message);
    this.updateMessages(message);
  };

  componentDidMount = () => {
    socketServices.initializeSocket(this.props.userData.accessToken);
    socketServices.on(SOCKET_STRINGS.RECEIVED_MESSAGE, this.messageReceived);
    this.getData();
  };

  componentWillUnmount = () => {
    socketServices.removeListener(SOCKET_STRINGS.RECEIVED_MESSAGE);
  };

  render() {
    const {userData} = this.props;
    console.log(userData);
    const {allMessages, isLoading} = this.state;
    return (
      <WrapperContainer isLoading={isLoading}>
        <Text>This is chat room</Text>
        <GiftedChat
          messages={allMessages}
          user={{
            _id: userData._id,
          }}
          onSend={this.onSend}
        />
      </WrapperContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.authReducer.userData,
  };
};

export default connect(mapStateToProps)(ChatRoom);
