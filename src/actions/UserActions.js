import { Toast } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { DELETE_USER } from '../actions/types';
import { deleteUser as deleteUserService } from '../data';

export const deleteUser = (id, updateUser) => {
  return dispatch => {
    deleteUserService(id)
      .then(() => {
        updateUser(false);
        dispatch(NavigationActions.back());
      })
      .catch(err => {
        console.log(err);
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
