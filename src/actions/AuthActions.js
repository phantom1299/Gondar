import Auth0 from 'react-native-auth0';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types';

const auth0 = new Auth0({
  domain: 'mlx.eu.auth0.com',
  clientId: '5TURFeY22RUuFuWZbiYrgyvPOpu11fYH'
});
import { data } from '../data';

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
  return dispatch => {
    dispatch({ type: LOGIN_USER });

    auth0.auth
      .passwordRealm({ username: email, password, realm: 'Username-Password-Authentication' })
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => {
        console.log(error);
        loginUserFail(dispatch);
      });
  };
};

const loginUserFail = dispatch => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};
const loginUserSuccess = (dispatch, user) => {
  auth0.auth
    .userInfo({ token: user.accessToken })
    .then(user1 => {
      const id = user1.sub.split('|')[1];
      fetch(`${data.url}/kullanicilar/${id}`)
        .then(response => response.json())
        .then(response => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: response
          });
          Actions.drawer({ type: 'reset' });
        })
        .catch(console.log);
    })
    .catch(console.error);
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER });
  };
};

export const getUserInfo = accessToken => {
  return dispatch => {
    auth0.auth.userInfo({ token: accessToken }).then(console.log).catch(console.error);
  };
};
