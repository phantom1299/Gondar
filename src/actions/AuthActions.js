import Auth0 from 'react-native-auth0';
import { NavigationActions } from 'react-navigation';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types';
import { getUserById } from '../data';

const auth0 = new Auth0({
  domain: 'mlx.eu.auth0.com',
  clientId: '5TURFeY22RUuFuWZbiYrgyvPOpu11fYH'
});

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  console.log('trying to login.');
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    auth0.auth
      .passwordRealm({ username: email, password, realm: 'Username-Password-Authentication' })
      .then(user => {
        console.log('login done!');
        loginUserSuccess(dispatch, user);
      })
      .catch(error => {
        loginUserFail(dispatch, `Login Failed. ${error}`);
      });
  };
};

const loginUserFail = (dispatch, error) => {
  console.log(error);
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  });
};

const loginUserSuccess = (dispatch, user) => {
  console.log('getting user id!');
  auth0.auth
    .userInfo({ token: user.accessToken })
    .then(user1 => {
      const id = user1.sub.split('|')[1];
      console.log('getting user info!');

      getUserById(id)
        .then(response => {
          if (response.status === 200) {
            return response.json().then(result => {
              dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: result
              });
              dispatch(NavigationActions.navigate({ routeName: 'Drawer' }));
            });
          } else if (response.status === 204) {
            loginUserFail(dispatch, 'Hata! Kişi veritabanından silinmiş.');
          } else {
            loginUserFail(dispatch, `Sunucu ${response.status} hata kodunu döndürdü.`);
          }
        })
        .catch(error => {
          loginUserFail(dispatch, error);
        });
    })
    .catch(error => {
      loginUserFail(dispatch, error);
    });
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER });
  };
};

export const getUserInfo = accessToken => {
  return dispatch => {
    auth0.auth
      .userInfo({ token: accessToken })
      .then(console.log)
      .catch(console.error);
  };
};
