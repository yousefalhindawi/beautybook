import axiosInstance from "../../utils/axiosInstance.js";
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

const fetchServicesRequest = () => ({ type: FETCH_SERVICES_REQUEST });
const fetchServicesSuccess = (services) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: services,
});
const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: error,
});
const addServiceRequest = () => ({ type: ADD_SERVICE_REQUEST });
const addServiceSuccess = (service, message) => ({
  type: ADD_SERVICE_SUCCESS,
  payload: { service, message },
});
const addServiceFailure = (error) => ({
  type: ADD_SERVICE_FAILURE,
  payload: error,
});
const updateServiceRequest = () => ({ type: UPDATE_SERVICE_REQUEST });
const updateServiceSuccess = (service, message) => ({
  type: UPDATE_SERVICE_SUCCESS,
  payload: { service, message },
});
const updateServiceFailure = (error) => ({
  type: UPDATE_SERVICE_FAILURE,
  payload: error,
});
const deleteServiceRequest = () => ({ type: DELETE_SERVICE_REQUEST });
const deleteServiceSuccess = (serviceId, message) => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: { serviceId, message },
});
const deleteServiceFailure = (error) => ({
  type: DELETE_SERVICE_FAILURE,
  payload: error,
});
const resetServiceStatus = () => ({ type: RESET_SERVICE_STATUS });

const fetchServices = () => {
  return async (dispatch) => {
    dispatch(fetchServicesRequest());
    try {
      const servicesResponse = await axiosInstance.get("/services");
      const services = servicesResponse.data;
      dispatch(fetchServicesSuccess(services));
      //   dispatch(fetchServicesSuccess(services.data.services));
    } catch (error) {
      dispatch(fetchServicesFailure(error.message));
    }
  };
};

const addService = (service) => {
  return async (dispatch) => {
    dispatch(addServiceRequest());
    try {
      const serviceResponse = await axiosInstance.post("/services", service);
      dispatch(
        addServiceSuccess(serviceResponse.data, "Service added successfully")
      );
    } catch (error) {
      dispatch(addServiceFailure(error.message));
    }
  };
};

const updateService = (service) => {
  return async (dispatch) => {
    dispatch(updateServiceRequest());
    try {
      const serviceResponse = await axiosInstance.put(
        `/services/${service.id}`,
        service
      );
      dispatch(
        updateServiceSuccess(
          serviceResponse.data,
          "Service updated successfully"
        )
      );
    } catch (error) {
      dispatch(updateServiceFailure(error.message));
    }
  };
};

const deleteService = (serviceId) => {
  return async (dispatch) => {
    dispatch(deleteServiceRequest());
    try {
      await axiosInstance.delete(`/services/${serviceId}`);
      //   dispatch(deleteServiceSuccess(serviceId, serviceResponse.data.message));
      dispatch(deleteServiceSuccess(serviceId, "Service deleted successfully"));
    } catch (error) {
      dispatch(deleteServiceFailure(error.message));
    }
  };
};

export {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
  addServiceRequest,
  addServiceSuccess,
  addServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceSuccess,
  deleteServiceFailure,
  resetServiceStatus,
  fetchServices,
  addService,
  updateService,
  deleteService,
};
