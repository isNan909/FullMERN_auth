import axios from 'axios';
import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  USER_LOADED_SUCESS,
  USER_LOADED_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_FAILED,
  SIGNUP_SUCESS,
  LOGOUT_USER,
} from '../actions/action.types';

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const tokenCheck = JSON.stringify({
      token: localStorage.getItem('access'),
    });
    try {
      if (tokenCheck !== null) {
        dispatch({
          type: AUTHENTICATION_SUCESS,
        });
      }
    } catch (e) {
      dispatch({
        type: AUTHENTICATION_FAILED,
      });
    }
  }
  dispatch({
    type: AUTHENTICATION_FAILED,
  });
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };
    try {
      const res = await axios.get(
        `${process.env.CLIENT_API_URI}/api/login-user`,
        config
      );
      dispatch({
        type: USER_LOADED_SUCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAILED,
      });
    }
  }
};

export const login = (name, email, password) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      `${process.env.CLIENT_API_URI}/auth/signin-user`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    dispatch(load_user());
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

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      `${process.env.CLIENT_API_URI}/auth/signup-user`,
      body,
      config
    );
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });
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
