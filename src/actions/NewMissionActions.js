import { Toast } from 'native-base';
import { NavigationActions } from 'react-navigation';
import {
  NEW_MISSION_FORM_WILL_MOUNT,
  NEW_MISSION_FORM_TITLE_CHANGED,
  NEW_MISSION_FORM_EMPLOYER_CHANGED,
  NEW_MISSION_FORM_BUDGET_CHANGED,
  NEW_MISSION_FORM_DEADLINE_CHANGED,
  NEW_MISSION_FORM_DESCRIPTION_CHANGED,
  NEW_MISSION_FORM_ADD_MISSION,
  NEW_MISSION_FORM_ADD_MISSION_SUCCESS,
  NEW_MISSION_FORM_ADD_MISSION_FAIL
} from '../actions/types';
import { createJob } from '../data';

export const newMissionFormWillMount = () => {
  return {
    type: NEW_MISSION_FORM_WILL_MOUNT
  };
};

export const newMissionFormTitleChanged = text => {
  return {
    type: NEW_MISSION_FORM_TITLE_CHANGED,
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
//TODO Dosya ekleme
export const newMissionAdd = job => {
  return dispatch => {
    dispatch({ type: NEW_MISSION_FORM_ADD_MISSION });
    createJob(job)
      .then(response => {
        if (response.status === 200) { 
          response.json().then(result => newMissionAddSuccess(dispatch, result._id)); 
        } else newMissionAddFail(dispatch, `Sunucu "${response.status}" hata kodunu döndrüdü.`);
      })
      .catch(err => {
        console.log(err);
        newMissionAddFail(dispatch, err);
      });
  };
};

//İş başarılı bir şekilde oluşturulduysa, verileri database gir,
const newMissionAddSuccess = (dispatch, jobId) => {
  dispatch({
    type: NEW_MISSION_FORM_ADD_MISSION_SUCCESS,
    payload: jobId
  });
  dispatch(NavigationActions.back());
};

//İş ekleme başarısız olduysa hata mesajı göster
const newMissionAddFail = (dispatch, err) => {
  dispatch({
    type: NEW_MISSION_FORM_ADD_MISSION_FAIL
  });
  Toast.show({
    text: `İş Teklifi eklenemedi! ${err}`,
    position: 'bottom',
    buttonText: 'Tamam',
    type: 'danger',
    duration: 2000
  });
};
