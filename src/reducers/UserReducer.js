import { FETCH_USER } from '../actions/types';
import data from './data/Kullanici.json';

export default () => data;

const INITIAL_STATE = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  telephone: '',
  address: '',
  tags: [],
  avatarU: ''
};

// export default (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case FETCH_USER:
//       return { ...state, ...action.payload };

//     default:
//       return state;
//   }
// };
