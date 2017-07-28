import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { MessageBarAlert, MessageBarManager } from 'react-native-message-bar';
import {
    NEW_MISSION_FORM_WILL_MOUNT,
    NEW_MISSION_FORM_NAME_CHANGED,
    NEW_MISSION_FORM_EMPLOYER_CHANGED,
    NEW_MISSION_FORM_BUDGET_CHANGED,
    NEW_MISSION_FORM_DEADLINE_CHANGED,
    NEW_MISSION_FORM_DESCRIPTION_CHANGED,
    NEW_MISSION_FORM_ADD_MISSION,
    NEW_MISSION_FORM_ADD_MISSION_SUCCESS,
    NEW_MISSION_FORM_ADD_MISSION_FAIL
} from '../actions/types';

export const newMissionFormWillMount = () => {
    return ({
        type: NEW_MISSION_FORM_WILL_MOUNT
    });
};

export const newMissionFormNameChanged = (text) => {
    return ({
        type: NEW_MISSION_FORM_NAME_CHANGED,
        payload: text
    });
};

export const newMissionFormEmployerChanged = (text) => {
    return ({
        type: NEW_MISSION_FORM_EMPLOYER_CHANGED,
        payload: text
    });
};

export const newMissionFormBudgetChanged = (text) => {
    return ({
        type: NEW_MISSION_FORM_BUDGET_CHANGED,
        payload: text
    });
};

export const newMissionFormDeadlineChanged = (date) => {
    return ({
        type: NEW_MISSION_FORM_DEADLINE_CHANGED,
        payload: date
    });
};

export const newMissionFormDescriptionChanged = (text) => {
    return ({
        type: NEW_MISSION_FORM_DESCRIPTION_CHANGED,
        payload: text
    });
};

//İş Ekleme burda yapılacak
export const newMissionAdd = ({ name, employer, budged, deadline, description }) => {
    return (dispatch) => {
        dispatch({ type: NEW_MISSION_FORM_ADD_MISSION });
        newMissionAddSuccess(dispatch, { name, employer, budged, deadline, description });
    };
};

//İş başarılı bir şekilde oluşturulduysa, verileri database gir,
const newMissionAddSuccess = (dispatch, { name, employer, budged, deadline, description }) => {
    dispatch({
        type: NEW_MISSION_FORM_ADD_MISSION_SUCCESS
    });
    MessageBarManager.showAlert({
        title: 'Yeni İş Ekleme Başarılı',
        alertType: 'success',
        duration: 2000,
        position: 'bottom',
    });
};

//İş ekleme başarısız olduysa hata mesajı göster
const newMissionAddFail = (dispatch) => {
    dispatch({
        type: NEW_MISSION_FORM_ADD_MISSION_FAIL
    });
    MessageBarManager.showAlert({
        title: 'Yeni İş Ekleme Başarısız',
        alertType: 'error',
        duration: 2000,
        position: 'bottom',
    });
};
