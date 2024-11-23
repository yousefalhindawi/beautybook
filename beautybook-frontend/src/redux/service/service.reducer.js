import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE,
  RESET_SERVICE_STATUS,
} from "./service.constants.js";

const initialState = {
  services: [],
  loading: false,
  error: null,
  operation: "fetch",
  successMessage: null,
  errorMessage: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: true, error: null, operation: "fetch" };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        services: action.payload,
      };
    case FETCH_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "fetch",
      };
    case ADD_SERVICE_REQUEST:
      return { ...state, loading: true, error: null, operation: "add" };
    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        services: [...state.services, action.payload.service],
        loading: false,
        error: null,
        successMessage: action.payload.message,
        operation: "add",
      };
    case ADD_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "add",
      };
    case UPDATE_SERVICE_REQUEST:
      return { ...state, loading: true, error: null, operation: "update" };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.map((service) =>
          service.id === action.payload.service.id
            ? { ...service, ...action.payload.service }
            : service
        ),
        loading: false,
        error: null,
        successMessage: action.payload.message,
        operation: "update",
      };
    case UPDATE_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "update",
      };
    case DELETE_SERVICE_REQUEST:
      return { ...state, loading: true, error: null, operation: "delete" };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.filter(
          (service) => service.id !== action.payload.serviceId
        ),
        loading: false,
        error: null,
        successMessage: action.payload.message,
        operation: "delete",
      };
    case DELETE_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        operation: "delete",
      };
    case RESET_SERVICE_STATUS:
      return {
        ...state,
        loading: false,
        error: null,
        successMessage: null,
        errorMessage: null,
        operation: "fetch",
      };
    default:
      return state;
  }
};

export default serviceReducer;
