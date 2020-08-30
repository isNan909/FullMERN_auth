import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  USER_LOADED_SUCESS,
  USER_LOADED_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_SUCESS,
  SIGNUP_FAILED,
  LOGOUT_USER,
} from '../actions/action.types';

const initialState = {
  access: localStorage.getItem('access'),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATION_SUCESS:
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
      };
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        access: null,
      };
    case LOGIN_SUCESS:
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case LOGOUT_USER:
      return {
        ...state,
        access: null,
        isAuthenticated: false,
        user: null,
      };
    case SIGNUP_SUCESS:
      return {
        ...state,
        isAuthenticated: false,
      }
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
