import { Toast } from 'native-base';
import {
  USER_RESET,
  USER_EDIT,
  USER_EDIT_CANCEL,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_AVATAR_CHANGED,
  USER_NAME_CHANGED,
  USER_SURNAME_CHANGED,
  USER_TELEPHONE_CHANGED,
  USER_EMAIL_CHANGED,
  USER_ADDRESS_CHANGED,
  USER_SOCIAL_ACCOUNTS_CHANGED,
  USER_SOCIAL_ACCOUNT_DELETE
} from '../actions/types';
import { updateUser as updateUserService } from '../data';

export const userAvatarChanged = text => {
  return {
    type: USER_AVATAR_CHANGED,
    payload: text
  };
};

export const userNameChanged = text => {
  return {
    type: USER_NAME_CHANGED,
    payload: text
  };
};

export const userSurnameChanged = text => {
  return {
    type: USER_SURNAME_CHANGED,
    payload: text
  };
};

export const userTelephoneChanged = text => {
  return {
    type: USER_TELEPHONE_CHANGED,
    payload: text
  };
};

export const userEmailChanged = text => {
  return {
    type: USER_EMAIL_CHANGED,
    payload: text
  };
};

export const userAddressChanged = text => {
  return {
    type: USER_ADDRESS_CHANGED,
    payload: text
  };
};

export const userSocialAccountsChanged = socialAccount => {
  return {
    type: USER_SOCIAL_ACCOUNTS_CHANGED,
    payload: socialAccount
  };
};

export const onSocialAccountDelete = i => {
  return {
    type: USER_SOCIAL_ACCOUNT_DELETE,
    payload: i
  };
};

export const editUser = () => {
  return { type: USER_EDIT };
};

export const editUserCancel = () => {
  return { type: USER_EDIT_CANCEL };
};

export const userReset = () => {
  return { type: USER_RESET };
};

export const updateUser = user => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: USER_UPDATE
    });
    updateUserService(user)
      .then(() => {
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: user
        });
        Toast.show({
          text: 'Bilgileriniz başarıyla güncellendi!',
          position: 'bottom',
          buttonText: 'Tamam',
          type: 'success',
          duration: 4000
        });
        resolve();
      })
      .catch(err => {
        Toast.show({
          text: `Bilgileriniz güncellenirken bir hata oluştu:
                ${err}`,
          position: 'bottom',
          buttonText: 'Tamam',
          type: 'danger',
          duration: 4000
        });
        reject(err);
      });
  });
};

export const updateUserSuccess = () => {};

export const updateUserFail = (dispatch, error) => {};
