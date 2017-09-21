import Auth0 from 'react-native-auth0';
import { Toast } from 'native-base';
import {
  NEW_USER_FORM_WILL_MOUNT,
  NEW_USER_FORM_NAME_CHANGED,
  NEW_USER_FORM_EMAIL_CHANGED,
  NEW_USER_FORM_PASSWORD_CHANGED,
  NEW_USER_FORM_UNVAN_CHANGED,
  NEW_USER_FORM_ADD_USER,
  NEW_USER_FORM_ADD_USER_SUCCESS,
  NEW_USER_FORM_ADD_USER_FAIL
} from '../actions/types';
import { data } from '../data';

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

export const newUserUnvanChanged = text => {
  return {
    type: NEW_USER_FORM_UNVAN_CHANGED,
    payload: text
  };
};

//Kişi Ekleme burda yapılacak
export const newUserAdd = ({ isim, email, sifre, unvan, tags }) => {
  return dispatch => {
    dispatch({ type: NEW_USER_FORM_ADD_USER });
    auth0.auth
      .createUser({
        email,
        password: sifre,
        connection: 'Username-Password-Authentication'
      })
      .then(user => {
        fetch(`${data.url}/kullanicilar`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            profilFotografiUrl: 'https://randomuser.me/api/portraits/lego/5.jpg',
            isim,
            unvan,
            email,
            telefon: null,
            adres: null,
            tags,
            _id: user.Id
          })
        })
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
  Toast.show({
    text: 'Kişi eklendi!',
    position: 'bottom',
    buttonText: 'Tamam',
    type: 'success',
    duration: 2000
  });
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
