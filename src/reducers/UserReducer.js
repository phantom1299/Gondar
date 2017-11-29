import {
  LOGIN_USER_SUCCESS,
  USER_RESET,
  USER_EDIT,
  USER_EDIT_CANCEL,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_AVATAR_CHANGED,
  USER_NAME_CHANGED,
  USER_SURNAME_CHANGED,
  USER_TELEPHONE_CHANGED,
  USER_EMAIL_CHANGED,
  USER_ADDRESS_CHANGED,
  USER_SOCIAL_ACCOUNTS_CHANGED,
  USER_SOCIAL_ACCOUNT_DELETE,
  NEW_MISSION_FORM_ADD_MISSION_SUCCESS,
  JOB_DELETE_SUCCESS,
  APPLY_TO_JOB_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  user: {
    _id: '',
    avatarUrl: '',
    name: '',
    surname: '',
    email: '',
    telephone: '',
    address: '',
    appliedJobs: [],
    finishedJobs: [],
    activeJobs: [],
    socialAccounts: [
      {
        site: '',
        url: '',
        _id: ''
      }
    ],
    tags: []
  },
  loading: false,
  editable: false,
  backup: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_AVATAR_CHANGED:
      return { ...state, user: { ...state.user, avatarURL: action.payload } };

    case USER_NAME_CHANGED:
      return { ...state, user: { ...state.user, name: action.payload } };

    case USER_SURNAME_CHANGED:
      return { ...state, user: { ...state.user, surname: action.payload } };

    case USER_TELEPHONE_CHANGED:
      return { ...state, user: { ...state.user, telephone: action.payload } };

    case USER_EMAIL_CHANGED:
      return { ...state, user: { ...state.user, email: action.payload } };

    case USER_ADDRESS_CHANGED:
      return { ...state, user: { ...state.user, address: action.payload } };

    case USER_SOCIAL_ACCOUNTS_CHANGED:
      return {
        ...state,
        user: { ...state.user, socialAccounts: state.user.socialAccounts.concat(action.payload) }
      };

    case USER_SOCIAL_ACCOUNT_DELETE:
      return {
        ...state,
        user: {
          ...state.user,
          socialAccounts: state.user.socialAccounts.filter(
            acc => acc !== state.user.socialAccounts[action.payload]
          )
        }
      };

    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };

    case NEW_MISSION_FORM_ADD_MISSION_SUCCESS:
      return {
        ...state,
        user: { ...state.user, activeJobs: state.user.activeJobs.concat(action.payload) }
      };

    case JOB_DELETE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, activeJobs: state.user.activeJobs.filter(e => e !== action.payload) }
      };

    case APPLY_TO_JOB_SUCCESS:
      return {
        ...state,
        user: { ...state.user, appliedJobs: state.user.appliedJobs.concat(action.payload) }
      };

    case USER_RESET:
      return {
        ...state,
        editable: false,
        user: {
          ...state.user,
          socialAccounts: state.backup.socialAccounts
            ? state.backup.socialAccounts
            : state.user.socialAccounts
        }
      };

    case USER_EDIT:
      return { ...state, backup: { ...state.user }, editable: true };

    case USER_EDIT_CANCEL:
      return { ...state, user: { ...state.backup }, editable: false };

    case USER_UPDATE:
      return { ...state, loading: true, editable: false };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        editable: false
      };

    default:
      return state;
  }
};
