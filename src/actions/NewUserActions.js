import Auth0 from 'react-native-auth0';
import { Toast } from 'native-base';
import { NavigationActions } from 'react-navigation';

import {
  NEW_USER_FORM_WILL_MOUNT,
  NEW_USER_FORM_NAME_CHANGED,
  NEW_USER_FORM_SURNAME_CHANGED,
  NEW_USER_FORM_EMAIL_CHANGED,
  NEW_USER_FORM_PASSWORD_CHANGED,
  NEW_USER_FORM_ADD_USER,
  NEW_USER_FORM_ADD_USER_SUCCESS,
  NEW_USER_FORM_ADD_USER_FAIL
} from '../actions/types';
import { createUser } from '../data';

const auth0 = new Auth0({
  domain: 'mlx.eu.auth0.com',
  clientId: '5TURFeY22RUuFuWZbiYrgyvPOpu11fYH'
});

export const newUserFormWillMount = () => {
  return {
    type: NEW_USER_FORM_WILL_MOUNT
  };
};

export const newUserNameChanged = text => {
  return {
    type: NEW_USER_FORM_NAME_CHANGED,
    payload: text
  };
};

export const newUserSurnameChanged = text => {
  return {
    type: NEW_USER_FORM_SURNAME_CHANGED,
    payload: text
  };
};

export const newUserEmailChanged = text => {
  return {
    type: NEW_USER_FORM_EMAIL_CHANGED,
    payload: text
  };
};

export const newUserPasswordChanged = text => {
  return {
    type: NEW_USER_FORM_PASSWORD_CHANGED,
    payload: text
  };
};

//Kişi Ekleme burda yapılacak
export const newUserAdd = ({ name, surname, email, password, tags }) => {
  return dispatch => {
    dispatch({ type: NEW_USER_FORM_ADD_USER });
    auth0.auth
      .createUser({
        email,
        password,
        connection: 'Username-Password-Authentication'
      })
      .then(user => {
        createUser({ _id: user.Id, name, surname, email, tags })
          .then(() => newUserAddSuccess(dispatch))
          .catch(err => {
            console.log(err);
            newUserAddFail(dispatch, 'Kullanıcı veritabanına kaydedilemedi.');
          });
      })
      .catch(error => {
        console.log(error);
        newUserAddFail(dispatch, error);
      });
  };
};

//Kişi başarılı bir şekilde oluşturulduysa, verileri database gir,
const newUserAddSuccess = dispatch => {
  dispatch({
    type: NEW_USER_FORM_ADD_USER_SUCCESS
  });
  dispatch(NavigationActions.navigate({ routeName: 'UserList', params: { userAdded: true } }));
};

//Kişi ekleme başarısız olduysa hata mesajı göster
const newUserAddFail = (dispatch, error) => {
  dispatch({
    type: NEW_USER_FORM_ADD_USER_FAIL,
    payload: error.message
  });
  Toast.show({
    text: 'Kişi eklenemedi!',
    position: 'bottom',
    buttonText: 'Tamam',
    type: 'danger',
    duration: 2000
  });
};
