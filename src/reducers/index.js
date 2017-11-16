import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NewUserReducer from './NewUserReducer';
import NewMissionReducer from './NewMissionReducer';
import UserReducer from './UserReducer';
import NavReducer from './NavReducer';

export default combineReducers({
  nav: NavReducer,
  auth: AuthReducer,
  newUserForm: NewUserReducer,
  newMissionForm: NewMissionReducer,
  user: UserReducer
});
