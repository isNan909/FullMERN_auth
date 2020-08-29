import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  USER_LOADED_SUCESS,
  USER_LOADED_FAILED,
} from '../actions/action.types';

const initialState = {
  access: localStorage.getItem('access'),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCESS:
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        access: null,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOADED_SUCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAILED:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
