import {
  FETCH_STAFFS_REQUEST,
  FETCH_STAFFS_SUCCESS,
  FETCH_STAFFS_FAILURE,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ADD_STAFF_FAILURE,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAILURE,
  RESET_STAFF_STATUS,
} from "./staff.constants.js";

const initialState = {
  staffs: [],
  loading: false,
  error: null,
  operation: "fetch",
  successMessage: null,
  errorMessage: null,
};
const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAFFS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_STAFFS_SUCCESS:
      return {
        ...state,
        staffs: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_STAFFS_FAILURE:
      return {
        ...state,
        staffs: null,
        loading: false,
        error: action.payload,
      };
    case ADD_STAFF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_STAFF_SUCCESS:
      return {
        ...state,
        staffs: [...state.staffs, action.payload.staff],
        successMessage: action.payload.message,
        loading: false,
        error: null,
      };
    case ADD_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_STAFF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        staffs: state.staffs.filter(
          (staff) => staff.id !== action.payload.staffId
        ),
        successMessage: action.payload.message,
        loading: false,
        error: null,
      };
    case DELETE_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_STAFF_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        staffs: state.staffs.map((staff) =>
          staff.id === action.payload.staff.id ? action.payload.staff : staff
        ),
        successMessage: action.payload.message,
        loading: false,
        error: null,
      };
    case UPDATE_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_STAFF_STATUS:
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
        error: null,
        loading: false,
        operation: "fetch",
      };
    default:
      return state;
  }
};

export default staffReducer;
