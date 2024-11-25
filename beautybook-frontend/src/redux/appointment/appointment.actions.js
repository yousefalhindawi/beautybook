import axiosInstance from "../../utils/axiosInstance";
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

const fetchAppointmentsRequest = () => ({
  type: FETCH_APPOINTMENTS_REQUEST,
});

const fetchAppointmentsSuccess = (appointments) => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

const fetchAppointmentsFailure = (error) => ({
  type: FETCH_APPOINTMENTS_FAILURE,
  payload: error,
});

const addAppointmentRequest = () => ({
  type: ADD_APPOINTMENT_REQUEST,
});

const addAppointmentSuccess = (appointment, message) => ({
  type: ADD_APPOINTMENT_SUCCESS,
  payload: { appointment, message },
});
const addAppointmentFailure = (error) => ({
  type: ADD_APPOINTMENT_FAILURE,
  payload: error,
});

const updateAppointmentRequest = () => ({
  type: UPDATE_APPOINTMENT_REQUEST,
});

const updateAppointmentSuccess = (appointment, message) => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
  payload: { appointment, message },
});
const updateAppointmentFailure = (error) => ({
  type: UPDATE_APPOINTMENT_FAILURE,
  payload: error,
});

const deleteAppointmentRequest = () => ({
  type: DELETE_APPOINTMENT_REQUEST,
});

const deleteAppointmentSuccess = (appointmentId, message) => ({
  type: DELETE_APPOINTMENT_SUCCESS,
  payload: { appointmentId, message },
});
const deleteAppointmentFailure = (error) => ({
  type: DELETE_APPOINTMENT_FAILURE,
  payload: error,
});

const resetAppointmentStatus = () => ({
  type: RESET_APPOINTMENT_STATUS,
});

const fetchAppointments = () => {
  return async (dispatch) => {
    dispatch(fetchAppointmentsRequest());
    try {
      const appointmentResponse = await axiosInstance.get("/appointments");
      dispatch(fetchAppointmentsSuccess(appointmentResponse.data));
    } catch (error) {
      dispatch(fetchAppointmentsFailure(error.message));
    }
  };
};

const addAppointment = (appointment) => {
  return async (dispatch) => {
    dispatch(addAppointmentRequest());
    try {
      const response = await axiosInstance.post("/appointments", appointment);
      dispatch(
        addAppointmentSuccess(response.data, "Appointment added successfully")
      );
    } catch (error) {
      dispatch(addAppointmentFailure(error.message));
    }
  };
};

const updateAppointment = (appointment) => {
  return async (dispatch) => {
    dispatch(updateAppointmentRequest());
    try {
      const response = await axiosInstance.put(
        `/appointments/${appointment.id}`,
        appointment
      );
      dispatch(
        updateAppointmentSuccess(
          response.data,
          "Appointment updated successfully"
        )
      );
    } catch (error) {
      dispatch(updateAppointmentFailure(error.message));
    }
  };
};

const deleteAppointment = (appointmentId) => {
  return async (dispatch) => {
    dispatch(deleteAppointmentRequest);
    try {
      await axiosInstance.delete(`/appointments/${appointmentId}`);
      dispatch(
        deleteAppointmentSuccess(
          appointmentId,
          "Appointment deleted successfully"
        )
      );
    } catch (error) {
      dispatch(deleteAppointmentFailure(error.message));
    }
  };
};

export {
  fetchAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  resetAppointmentStatus,
};
