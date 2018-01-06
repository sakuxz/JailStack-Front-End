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
      return {
        ...state,
        ...(action.payload),
      };

    case USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export const login = (userId, userName, token) => (
  {
    type: USER_LOGIN,
    payload: {
      userId,
      userName,
      token,
    },
  }
);

export const logout = () => (
  {
    type: USER_LOGOUT,
  }
);
