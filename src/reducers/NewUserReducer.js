import {
    NEW_USER_FORM_WILL_MOUNT,
    NEW_USER_FORM_NAME_CHANGED,
    NEW_USER_FORM_EMAIL_CHANGED,
    NEW_USER_FORM_PASSWORD_CHANGED,
    NEW_USER_FORM_PASSWORD2_CHANGED,
    NEW_USER_FORM_ADD_USER,
    NEW_USER_FORM_ADD_USER_SUCCESS,
    NEW_USER_FORM_ADD_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    password2: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_USER_FORM_EMAIL_CHANGED:
            return { ...state, email: action.payload };

        case NEW_USER_FORM_PASSWORD_CHANGED:
            return { ...state, password: action.payload };

        case NEW_USER_FORM_PASSWORD2_CHANGED:
            return { ...state, password2: action.payload };

        case NEW_USER_FORM_NAME_CHANGED:
            return { ...state, name: action.payload };

        case NEW_USER_FORM_ADD_USER:
            return { ...state, loading: true, error: '' };

        case NEW_USER_FORM_ADD_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };

        case NEW_USER_FORM_WILL_MOUNT:
            return { ...state, ...INITIAL_STATE };

        case NEW_USER_FORM_ADD_USER_FAIL:
            return { ...state, error: 'Kişi Ekleme başarısız.', loading: false };

        default:
            return state;
    }
};
