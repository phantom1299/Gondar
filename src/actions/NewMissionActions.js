import { Toast } from 'native-base';
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
import { data } from '../data';

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
export const newMissionAdd = ({ title, employerId, budget, deadline, description, tags }) => {
  return dispatch => {
    console.log(budget);
    console.log(typeof budget);
    dispatch({ type: NEW_MISSION_FORM_ADD_MISSION });
    fetch(`${data.url}/job`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        budget,
        deadline,
        employer: employerId,
        tags,
        progress: 0,
        files: null,
        notes: null,
        status: 'created',
        creationDate: new Date()
      })
    })
      .then(stats => {
        console.log(stats);
        newMissionAddSuccess(dispatch);
      })
      .catch(err => {
        console.log(err);
        newMissionAddFail(dispatch);
      });
  };
};

//İş başarılı bir şekilde oluşturulduysa, verileri database gir,
const newMissionAddSuccess = dispatch => {
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
