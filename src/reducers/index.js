import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';
import NewUserReducer from './NewUserReducer';
import NewMissionReducer from './NewMissionReducer';

export default combineReducers({
    auth: AuthReducer,
    data: DataReducer,
    newUserForm: NewUserReducer,
    newMissionForm: NewMissionReducer
});
