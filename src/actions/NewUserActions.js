import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { MessageBarAlert, MessageBarManager } from 'react-native-message-bar';
import {
    NEW_USER_FORM_WILL_MOUNT,
    NEW_USER_FORM_NAME_CHANGED,
    NEW_USER_FORM_EMAIL_CHANGED,
    NEW_USER_FORM_PASSWORD_CHANGED,
    NEW_USER_FORM_PASSWORD2_CHANGED,
    NEW_USER_FORM_ADD_USER,
    NEW_USER_FORM_ADD_USER_SUCCESS,
    NEW_USER_FORM_ADD_USER_FAIL
} from '../actions/types';

export const newUserFormWillMount = (text) => {
    return ({
        type: NEW_USER_FORM_WILL_MOUNT,
        payload: text
    });
};

export const newUserNameChanged = (text) => {
    return ({
        type: NEW_USER_FORM_NAME_CHANGED,
        payload: text
    });
};

export const newUserEmailChanged = (text) => {
    return ({
        type: NEW_USER_FORM_EMAIL_CHANGED,
        payload: text
    });
};

export const newUserPasswordChanged = (text) => {
    return ({
        type: NEW_USER_FORM_PASSWORD_CHANGED,
        payload: text
    });
};

export const newUserPassword2Changed = (text) => {
    return ({
        type: NEW_USER_FORM_PASSWORD2_CHANGED,
        payload: text
    });
};

//Kişi Ekleme burda yapılacak
export const newUserAdd = ({ name, email, password }) => {
    return (dispatch) => {
        dispatch({ type: NEW_USER_FORM_ADD_USER });
        // örnek
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((user) => newUserAddSuccess(dispatch, user, { name, email, password }))
        //     .catch(() => newUserAddFail(dispatch));
        newUserAddSuccess(dispatch, null, { name, email, password });
    };
};

//Kişi başarılı bir şekilde oluşturulduysa, verileri database gir,
const newUserAddSuccess = (dispatch, user, { name, email, password }) => {
    // örnek    
    // firebase.database().ref(`/users/${user.uid}`)
    //     .push({ name, email, password })
    //     .then(() => {
    //         dispatch({
    //             type: NEW_USER_FORM_ADD_USER_SUCCESS
    //         });
    //         MessageBarManager.showAlert({
    //             title: 'Yeni Kişi Ekleme Başarılı',
    //             alertType: 'success',
    //             duration: 2000
    //         });
    //         Actions.home();
    //     });
    MessageBarManager.showAlert({
        title: 'Yeni Kişi Ekleme Başarılı',
        alertType: 'success',
        duration: 2000,
        position: 'bottom',
    });
    dispatch({
        type: NEW_USER_FORM_ADD_USER_SUCCESS
    });
};

//Kişi ekleme başarısız olduysa hata mesajı göster
const newUserAddFail = (dispatch) => {
    dispatch({
        type: NEW_USER_FORM_ADD_USER_FAIL
    });
    MessageBarManager.showAlert({
        title: 'Yeni Kişi Ekleme Başarısız',
        alertType: 'error',
        duration: 2000,
        position: 'bottom',
    });
};
