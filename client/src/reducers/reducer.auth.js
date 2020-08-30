import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
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
        access: payload.token,
      };
    case AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        access: null,
      };
    case LOGIN_SUCESS:
      localStorage.setItem('access', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.token,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case LOGOUT_USER:
      localStorage.removeItem('access');
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
      };
    default:
      return state;
  }
}
