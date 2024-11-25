import axiosInstance from "../../utils/axiosInstance.js";
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

export const fetchStaffsRequest = () => {
  return {
    type: FETCH_STAFFS_REQUEST,
  };
};

export const fetchStaffsSuccess = (staffs) => {
  return {
    type: FETCH_STAFFS_SUCCESS,
    payload: staffs,
  };
};

export const fetchStaffsFailure = (error) => {
  return {
    type: FETCH_STAFFS_FAILURE,
    payload: error,
  };
};

export const addStaffRequest = () => {
  return {
    type: ADD_STAFF_REQUEST,
  };
};

export const addStaffSuccess = (staff, message) => {
  return {
    type: ADD_STAFF_SUCCESS,
    payload: { staff, message },
  };
};

export const addStaffFailure = (error) => {
  return {
    type: ADD_STAFF_FAILURE,
    payload: error,
  };
};

export const deleteStaffRequest = () => {
  return {
    type: DELETE_STAFF_REQUEST,
  };
};

export const deleteStaffSuccess = (staffId, message) => {
  return {
    type: DELETE_STAFF_SUCCESS,
    payload: { staffId, message },
  };
};

export const deleteStaffFailure = (error) => {
  return {
    type: DELETE_STAFF_FAILURE,
    payload: error,
  };
};

export const updateStaffRequest = () => {
  return {
    type: UPDATE_STAFF_REQUEST,
  };
};

export const updateStaffSuccess = (staff, message) => {
  return {
    type: UPDATE_STAFF_SUCCESS,
    payload: { staff, message },
  };
};

export const updateStaffFailure = (error) => {
  return {
    type: UPDATE_STAFF_FAILURE,
    payload: error,
  };
};

const resetStaffStatus = () => {
  return {
    type: RESET_STAFF_STATUS,
  };
};

const fetchStaffs = () => {
  return async (dispatch) => {
    dispatch(fetchStaffsRequest());
    try {
      const response = await axiosInstance.get("/staffs");
      dispatch(fetchStaffsSuccess(response.data));
    } catch (error) {
      dispatch(fetchStaffsFailure(error.message));
    }
  };
};

const addStaff = (staff) => {
  return async (dispatch) => {
    dispatch(addStaffRequest());
    try {
      const response = await axiosInstance.post("/staffs", staff);
      dispatch(addStaffSuccess(response.data, "Staff added successfully"));
    } catch (error) {
      dispatch(addStaffFailure(error.message));
    }
  };
};

const updateStaff = (staff) => {
  return async (dispatch) => {
    dispatch(updateStaffRequest());
    try {
      const updatedStaffResponse = await axiosInstance.put(
        `/staffs/${staff.id}`,
        staff
      );
      dispatch(
        updateStaffSuccess(
          updatedStaffResponse.data,
          "Staff updated successfully"
        )
      );
    } catch (error) {
      dispatch(updateStaffFailure(error.message));
    }
  };
};

const deleteStaff = (staffId) => {
  return async (dispatch) => {
    dispatch(deleteStaffRequest());
    try {
      const updatedStaffResponse = await axiosInstance.delete(
        `/staffs/${staffId}`
      );
      dispatch(deleteStaffSuccess(staffId, "Staff deleted successfully"));
    } catch (error) {
      dispatch(deleteStaffFailure(error.message));
    }
  };
};

export { fetchStaffs, addStaff, updateStaff, deleteStaff, resetStaffStatus };
