import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  LOGOUT,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE,
} from "./auth.constants";

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LOGIN_SUCCESS:
      console.log("action.payload", action.payload);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case LOGOUT: {
      return {
        ...state,
        token: null,
        user: null,
      };
    }
    case FETCH_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REGISTER_SUCCESS:
      console.log("FETCH_REGISTER_SUCCESSaction.payload", action.payload);
      return {
        ...state,
        // token: action.payload.token,
        user: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
