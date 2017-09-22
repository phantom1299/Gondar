import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { DELETE_USER } from '../actions/types';
import { data } from '../data';

export const deleteUser = id => {
  return dispatch => {
    fetch(`${data.url}/kullanicilar/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        Toast.show({
          text: 'Kişi başarıyla silindi!',
          position: 'bottom',
          buttonText: 'Tamam',
          type: 'success',
          duration: 2000
        });
        Actions.kisilerList({ type: 'replace' });
      })
      .catch(err => {
        Toast.show({
          text: `Kişiyi silerken bir hata oluştu:
                ${err}`,
          position: 'bottom',
          buttonText: 'Tamam',
          type: 'danger',
          duration: 2000
        });
      });
  };
};

export const deleteUserSuccess = () => {};

export const deleteUserFail = (dispatch, error) => {};
