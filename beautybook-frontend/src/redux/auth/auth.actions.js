import axiosInstance from "../../utils/axiosInstance";
import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  LOGOUT,
  FETCH_REGISTER_REQUEST,
  FETCH_REGISTER_SUCCESS,
  FETCH_REGISTER_FAILURE,
  RESET_AUTH_STATUS,
} from "./auth.constants";

const fetchLoginRequest = () => ({
  type: FETCH_LOGIN_REQUEST,
});
const fetchLoginSuccess = (payload) => ({
  type: FETCH_LOGIN_SUCCESS,
  payload: { token: payload.token, user: payload.user },
});
const fetchLoginFailure = (error) => ({
  type: FETCH_LOGIN_FAILURE,
  payload: { error },
});

const fetchLogout = () => ({
  type: LOGOUT,
});

const fetchRegisterRequest = () => ({
  type: FETCH_REGISTER_REQUEST,
});
const fetchRegisterSuccess = (payload) => ({
  type: FETCH_REGISTER_SUCCESS,
  payload: { user: payload },
});
const fetchRegisterFailure = (error) => ({
  type: FETCH_REGISTER_FAILURE,
  payload: { error },
});

const resetAuthStatus = () => ({
  type: RESET_AUTH_STATUS,
});

const register = (reqBody) => {
  return async (dispatch) => {
    dispatch(fetchRegisterRequest());
    try {
      const userResponse = await axiosInstance.post("/auth/register", reqBody);
      dispatch(fetchRegisterSuccess(userResponse));
    } catch (error) {
      console.log("error", error.status);
      if (error.status === 400) {
        await dispatch(fetchRegisterFailure(error.response.data.error));
      } else {
        dispatch(fetchRegisterFailure(error.message));
      }
    }
  };
};

const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(fetchLoginRequest());
    try {
      const userResponse = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", userResponse.data.token);
      dispatch(
        fetchLoginSuccess({
          user: userResponse.data.user,
          token: userResponse.data.token,
        })
      );
    } catch (error) {
      dispatch(fetchLoginFailure("Invalid credentials"));
      throw error;
    }
  };
};

const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/login";
      dispatch(fetchLogout());
    } catch (error) {
      dispatch(fetchLoginFailure(error.message));
    }
  };
};

export {
  register,
  login,
  logout,
  fetchLoginRequest,
  fetchLoginSuccess,
  fetchLoginFailure,
  fetchLogout,
  fetchRegisterRequest,
  fetchRegisterSuccess,
  fetchRegisterFailure,
  resetAuthStatus,
};

// const registerUser = async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { email, password: hashedPassword, role },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
//   const initialState = {
//         token: null,
//         user: null,
//         loading: false,
//         error: null,
//       };
//   export const loginReducer = (state = initialState, action) => {
//       switch (action.type) {
//         case FETCH_LOGIN_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//                 };
//         case FETCH_LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 token: action.payload.token,
//                 user: action.payload.user,
//                 loading: false,
//                 error: null,
//                 };
//         case FETCH_LOGIN_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload.error,
//                 };
//         default:
//             return state;
//         }

//     }
