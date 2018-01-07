import axios from 'axios';
import { push } from 'react-router-redux';

export const USER_LOGIN = 'user/USER_LOGIN';
export const USER_LOGOUT = 'counter/USER_LOGOUT';

const initialState = {
  userId: null,
  userName: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      localStorage.token = action.payload.token;
      return {
        ...state,
        ...(action.payload),
      };

    case USER_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export const register = user => (
  (dispatch) => {
    axios.post('/api/register', {
      ...user,
    }).then((res) => {
      const mes = res.data;
      dispatch({
        type: USER_LOGIN,
        payload: {
          userId: mes.data.user.id,
          userName: mes.data.user.name,
          token: mes.data.token,
        },
      });
      dispatch(push('/app'));
    });
  }
);

export const login = user => (
  (dispatch) => {
    axios.post('/api/login', {
      ...user,
    }).then((res) => {
      const mes = res.data;
      dispatch({
        type: USER_LOGIN,
        payload: {
          userId: mes.data.user.id,
          userName: mes.data.user.name,
          token: mes.data.token,
        },
      });
      dispatch(push('/app'));
    });
  }
);

export const logout = () => (
  (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch(push('/login'));
  }
);
