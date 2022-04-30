import {
  CREATE_ANCILLARY_SUCCESS,
  LOAD_ANCILLARY_SUCCESS,
  DELETE_PASSENGER_OPTIMISTIC,
  UPDATE_ANCILLARY_SUCCESS,
} from "../actions/storeActionTypes";
import initialState from "./initialState";

export default function ancillaryReducer(
  state = initialState.ancillaryLists,
  { type, payload }
) {
  switch (type) {
    case LOAD_ANCILLARY_SUCCESS:
      return payload;
    case CREATE_ANCILLARY_SUCCESS:
      return [...state, { ...payload }];
    case UPDATE_ANCILLARY_SUCCESS:
      return state.map((ancillary) =>
        ancillary.id === payload.id ? payload : ancillary
      );
    case DELETE_PASSENGER_OPTIMISTIC:
      return state.filter((ancillary) => ancillary.id !== payload);
    default:
      return state;
  }
}
