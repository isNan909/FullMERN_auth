import axios from "axios";
import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_FAILED,
  SIGNUP_SUCESS,
  LOGOUT_USER,
} from "./action.types";

import setAuthToken from "../utils/setAuthToken";

//Action checks for authentication
export const check_authenticated = () => async (dispatch) => {
  if (localStorage.access) {
    setAuthToken(localStorage.access);
  }

  try {
    const res = await axios.get("api/auth/");

    dispatch({
      type: AUTHENTICATION_SUCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_FAILED,
    });
  }
};

export const login = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });
  console.log(body);
  try {
    const res = await axios.post("api/auth/signin-user", body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    dispatch(check_authenticated());
    console.log("user logged In!");
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const signup = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    console.log(body);
    const res = await axios.post("api/auth/register-user", body, config);
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });
    dispatch(check_authenticated());
    console.log("user created!");
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
