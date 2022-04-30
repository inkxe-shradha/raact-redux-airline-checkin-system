import {
  DELETE_PASSENGER_OPTIMISTIC,
  CREATE_PASSENGER_SUCCESS,
  UPDATE_PASSENGER_SUCCESS,
  LOAD_PASSENGERS_SUCCESS,
} from "../actions/storeActionTypes";
import initialState from "./initialState";

const passengerReducer = (
  state = initialState.passengers,
  { type, payload = [] }
) => {
  switch (type) {
    case CREATE_PASSENGER_SUCCESS:
      return [...state, { ...payload }];
    case UPDATE_PASSENGER_SUCCESS:
      return state.map((passenger) =>
        passenger.id === payload.id ? payload : passenger
      );
    case LOAD_PASSENGERS_SUCCESS:
      const {
        response,
        mandatoryFields: { isPassport, isDob, isAddress },
        selectedFlight,
      } = payload;
      if (!isPassport && !isDob && !isAddress) return response;
      else {
        return response.filter((ele) => {
          // return ele.flight !== selectedFlight
          //   ? false
          //   : !ele.dob || !ele.passport || !ele.address;
          if (ele.flight !== selectedFlight) {
            return false;
          }
          if (
            (isPassport && !ele.passport) ||
            (isDob && !ele.dob) ||
            (isAddress && !ele.address)
          ) {
            return ele;
          }
        });
      }
    case DELETE_PASSENGER_OPTIMISTIC:
      return state.filter((passenger) => passenger.id !== payload);
    default:
      return state;
  }
};

export default passengerReducer;
