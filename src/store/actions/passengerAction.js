import {
  deletePassengerById,
  getAllPassengerList,
  savePassengerDetails,
} from "../../Api/passengerServic";
import { apiCallError, beginApiCall } from "./apiStatusAction";
import {
  LOAD_PASSENGERS_SUCCESS,
  CREATE_PASSENGER_SUCCESS,
  UPDATE_PASSENGER_SUCCESS,
  DELETE_PASSENGER_OPTIMISTIC,
} from "./storeActionTypes";

export function loadPassengersSuccess(payload) {
  return { type: LOAD_PASSENGERS_SUCCESS, payload };
}
export function savePassengerOnSuccess(payload) {
  return { type: CREATE_PASSENGER_SUCCESS, payload };
}
export function updatePassengerOnSuccess(payload) {
  return { type: UPDATE_PASSENGER_SUCCESS, payload };
}

export const loadPassengerList =
  (
    mandatoryFields = {
      isPassport: false,
      isDob: false,
      isAddress: false,
    },
    selectedFlight = null
  ) =>
  (dispatch) => {
    dispatch(beginApiCall());
    return getAllPassengerList()
      .then((res) => {
        dispatch(
          loadPassengersSuccess({
            response: res.data,
            mandatoryFields,
            selectedFlight,
          })
        );
      })
      .catch((err) => dispatch(apiCallError(err)));
  };

export const savePassengerList = (passenger) => (dispatch) => {
  dispatch(beginApiCall());
  return savePassengerDetails(passenger)
    .then((res) => {
      if (passenger.id) {
        dispatch(updatePassengerOnSuccess(res.data));
      } else {
        dispatch(savePassengerOnSuccess(res.data));
      }
      return res.data;
    })
    .catch((err) => dispatch(apiCallError(err)));
};

export const deletePassenger = (passenger) => (dispatch) => {
  return deletePassengerById(passenger).then(() => {
    dispatch({ type: DELETE_PASSENGER_OPTIMISTIC, payload: passenger });
  });
};
