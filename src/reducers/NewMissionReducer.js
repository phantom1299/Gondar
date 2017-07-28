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

const INITIAL_STATE = {
    name: '',
    employer: '',
    budget: '',
    deadline: '',
    description: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_MISSION_FORM_NAME_CHANGED:
            return { ...state, name: action.payload };
            
        case NEW_MISSION_FORM_EMPLOYER_CHANGED:
            return { ...state, employer: action.payload };
            
        case NEW_MISSION_FORM_BUDGET_CHANGED:
            return { ...state, budget: action.payload };
            
        case NEW_MISSION_FORM_DEADLINE_CHANGED:
            return { ...state, deadline: action.payload };
            
        case NEW_MISSION_FORM_DESCRIPTION_CHANGED:
            return { ...state, description: action.payload };

        case NEW_MISSION_FORM_ADD_MISSION:
            return { ...state, loading: true, error: '' };

        case NEW_MISSION_FORM_ADD_MISSION_SUCCESS:
            return { ...state, ...INITIAL_STATE };

        case NEW_MISSION_FORM_ADD_MISSION_FAIL:
            return { ...state, error: 'İş Ekleme başarısız.', loading: false };

        case NEW_MISSION_FORM_WILL_MOUNT:
            return { ...state, ...INITIAL_STATE };

        default:
            return state;
    }
};
