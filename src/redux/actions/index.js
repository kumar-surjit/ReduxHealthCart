import * as authActions from './authActions';
import * as homeActions from './homeActions';
import * as profileActions from './profileActions';

export default {
  ...authActions,
  ...homeActions,
  ...profileActions,
};
