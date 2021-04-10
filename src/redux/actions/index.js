import * as authActions from './authActions';
import * as homeActions from './homeActions';
import * as profileActions from './profileActions';
import * as messagesActions from './messagesActions';

export default {
  ...authActions,
  ...homeActions,
  ...profileActions,
  ...messagesActions,
};
