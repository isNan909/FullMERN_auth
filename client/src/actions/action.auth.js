import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  USER_LOADED_SUCESS,
  USER_LOADED_FAILED,
} from '../actions/action.types';

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
      `${process.env.CLIENT_API_URI}/api/signup-user`,
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
