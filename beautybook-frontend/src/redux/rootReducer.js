import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import staffReducer from "./staff/staff.reducer";
import serviceReducer from "./service/service.reducer";
import appointmentReducer from "./appointment/appointment.reducer";


const rootReducer = combineReducers({
    appointment: appointmentReducer,
  service: serviceReducer,
  staff: staffReducer,
  auth: authReducer,
});

export default rootReducer;
