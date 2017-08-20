import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NewUserReducer from './NewUserReducer';
import NewMissionReducer from './NewMissionReducer';
import MissionReducer from './MissionReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    auth: AuthReducer,
    newUserForm: NewUserReducer,
    newMissionForm: NewMissionReducer,
    missions: MissionReducer,
    user: UserReducer
});
