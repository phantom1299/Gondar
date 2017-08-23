import { Actions } from 'react-native-router-flux';
import { Toast } from 'native-base';
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
  return {
    type: NEW_MISSION_FORM_WILL_MOUNT
  };
};

export const newMissionFormNameChanged = text => {
  return {
    type: NEW_MISSION_FORM_NAME_CHANGED,
    payload: text
  };
};

export const newMissionFormEmployerChanged = text => {
  return {
    type: NEW_MISSION_FORM_EMPLOYER_CHANGED,
    payload: text
  };
};

export const newMissionFormBudgetChanged = text => {
  return {
    type: NEW_MISSION_FORM_BUDGET_CHANGED,
    payload: text
  };
};

export const newMissionFormDeadlineChanged = date => {
  return {
    type: NEW_MISSION_FORM_DEADLINE_CHANGED,
    payload: date
  };
};

export const newMissionFormDescriptionChanged = text => {
  return {
    type: NEW_MISSION_FORM_DESCRIPTION_CHANGED,
    payload: text
  };
};

//İş Ekleme burda yapılacak
export const newMissionAdd = ({ name, employer, budged, deadline, description }) => {
  return dispatch => {
    dispatch({ type: NEW_MISSION_FORM_ADD_MISSION });
    newMissionAddSuccess(dispatch, { name, employer, budged, deadline, description });
  };
};

//İş başarılı bir şekilde oluşturulduysa, verileri database gir,
const newMissionAddSuccess = (dispatch, { name, employer, budged, deadline, description }) => {
  dispatch({
    type: NEW_MISSION_FORM_ADD_MISSION_SUCCESS
  });
  Toast.show({
    text: 'İş Teklifi eklendi!',
    position: 'bottom',
    buttonText: 'Tamam',
    type: 'success',
    duration: 2000
  });
};

//İş ekleme başarısız olduysa hata mesajı göster
const newMissionAddFail = dispatch => {
  dispatch({
    type: NEW_MISSION_FORM_ADD_MISSION_FAIL
  });
  Toast.show({
    text: 'İş Teklifi eklenemedi!',
    position: 'bottom',
    buttonText: 'Tamam',
    type: 'danger',
    duration: 2000
  });
};
