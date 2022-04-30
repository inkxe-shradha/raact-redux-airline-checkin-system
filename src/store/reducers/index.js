import { combineReducers } from "redux";
import ancillaryReducer from "./ancillaryReducer";
import apiStatusReducer from "./apiStatusReducer";
import authReducer from "./authReducer";
import passengerReducer from "./passengerReducer";

const rootReducers = combineReducers({
  auth: authReducer,
  apiCallStatus: apiStatusReducer,
  passengers: passengerReducer,
  ancillaryList: ancillaryReducer,
});

export default rootReducers;
