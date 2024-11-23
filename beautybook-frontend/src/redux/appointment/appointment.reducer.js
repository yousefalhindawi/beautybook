import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILURE,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAILURE,
  RESET_APPOINTMENT_STATUS,
} from "./appointment.constants.js";

const initialState = {
  appointments: null,
  loading: false,
  error: null,
  successMessage: null,
  errorMessage: null,
  operation: "fetch",
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS_REQUEST:
      return { ...state, loading: true, error: null, operation: "fetch" };
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        error: null,
        operation: "fetch",
      };
    case FETCH_APPOINTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "fetch",
      };
    case ADD_APPOINTMENT_REQUEST:
      return { ...state, loading: true, error: null, operation: "add" };
    case ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: [...state.appointments, action.payload.appointment],
        loading: false,
        error: null,
        successMessage: action.payload.message,
        operation: "add",
      };
    case ADD_APPOINTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "add",
      };
    case UPDATE_APPOINTMENT_REQUEST:
      return { ...state, loading: true, error: null, operation: "update" };
    case UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment.id === action.payload.appointment.id
            ? { ...appointment, ...action.payload.appointment }
            : appointment
        ),
        // appointments: [...state.appointments, action.payload.appointment],
        loading: false,
        error: null,
        successMessage: action.payload.message,
        operation: "update",
      };
    case UPDATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "update",
      };
    case DELETE_APPOINTMENT_REQUEST:
      return { ...state, loading: true, error: null, operation: "delete" };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment.id !== action.payload.appointmentId
        ),
        // appointments: [...state.appointments, action.payload.appointmentId],
        loading: false,
        error: null,
        successMessage: action.payload.message,
        operation: "delete",
      };
    case DELETE_APPOINTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "delete",
      };
    case RESET_APPOINTMENT_STATUS:
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
export default appointmentReducer;
