import axios from 'axios';
import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_FAILED,
  SIGNUP_SUCESS,
  LOGOUT_USER,
} from '../actions/action.types';

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const tokenCheck = { token: localStorage.getItem('access') };
    try {
      if (tokenCheck.token !== null) {
        dispatch({
          type: AUTHENTICATION_SUCESS,
          payload: tokenCheck,
        });
      }
    } catch (e) {
      dispatch({
        type: AUTHENTICATION_FAILED,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATION_FAILED,
    });
  }
};


export const login = (name, email, password) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  const body = { name, email, password };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signin-user`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    console.log('user logged In!');
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const signup = (name, email, password) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  const body = { name, email, password };

  try {
    console.log(body);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register-user`,
      body,
      config
    );
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });
    console.log('user created!');
  } catch (err) {
    dispatch({
      type: SIGNUP_FAILED,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
