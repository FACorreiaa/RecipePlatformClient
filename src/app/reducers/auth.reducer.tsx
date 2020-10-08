import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_NEW_USER,
} from "../types/auth.type";
const isEmpty = require("is-empty");

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  from: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user?: User | null;
  loading: boolean;
}

const initialState: any = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_NEW_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
