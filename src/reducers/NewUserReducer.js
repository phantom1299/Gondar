import {
  NEW_USER_FORM_WILL_MOUNT,
  NEW_USER_FORM_NAME_CHANGED,
  NEW_USER_FORM_EMAIL_CHANGED,
  NEW_USER_FORM_PASSWORD_CHANGED,
  NEW_USER_FORM_UNVAN_CHANGED,
  NEW_USER_FORM_TAG_CHANGED,
  NEW_USER_FORM_ADD_USER,
  NEW_USER_FORM_ADD_USER_SUCCESS,
  NEW_USER_FORM_ADD_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  isim: 'Alsd',
  email: 'asd@gmail.com',
  sifre: 'asd123',
  tags: [],
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_USER_FORM_EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case NEW_USER_FORM_PASSWORD_CHANGED:
      return { ...state, sifre: action.payload };

    case NEW_USER_FORM_NAME_CHANGED:
      return { ...state, isim: action.payload };

    case NEW_USER_FORM_UNVAN_CHANGED:
      return { ...state, unvan: action.payload };
    
    case NEW_USER_FORM_TAG_CHANGED:
      return { ...state, tag: action.payload };

    case NEW_USER_FORM_ADD_USER:
      return { ...state, loading: true, error: '' };

    case NEW_USER_FORM_ADD_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };

    case NEW_USER_FORM_WILL_MOUNT:
      return { ...state, ...INITIAL_STATE };

    case NEW_USER_FORM_ADD_USER_FAIL:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
