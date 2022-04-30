import {
  loadAncillaryLists,
  removeAncillaryService,
  saveAncillaryLists,
} from "../../Api/ancillaryService";
import { beginApiCall, apiCallError } from "./apiStatusAction";
import {
  CREATE_ANCILLARY_SUCCESS,
  DELETE_PASSENGER_OPTIMISTIC,
  LOAD_ANCILLARY_SUCCESS,
  UPDATE_ANCILLARY_SUCCESS,
} from "./storeActionTypes";

export const loadAncillaryListOnLoad = (payload) => {
  return { type: LOAD_ANCILLARY_SUCCESS, payload };
};

export const loadAncillaryList = () => (dispatch) => {
  dispatch(beginApiCall());
  return loadAncillaryLists()
    .then((pRes) => {
      dispatch(loadAncillaryListOnLoad(pRes.data));
    })
    .catch((err) => {
      console.error("Something went wrong", err);
      dispatch(apiCallError(err));
    });
};

export const deleteAncillaryDetails = (id) => (dispatch) => {
  return removeAncillaryService(id).then(() => {
    dispatch({ type: DELETE_PASSENGER_OPTIMISTIC, payload: id });
  });
};

export const saveUpdateAncillaryList = (service) => (dispatch) => {
  dispatch(beginApiCall());
  return saveAncillaryLists(service)
    .then((pRes) => {
      if (service.id) {
        dispatch({ type: UPDATE_ANCILLARY_SUCCESS, payload: pRes.data });
      } else {
        dispatch({ type: CREATE_ANCILLARY_SUCCESS, payload: pRes.data });
      }
      return pRes.data;
    })
    .catch((err) => {
      console.error("Something went wrong", err);
      dispatch(apiCallError(err));
    });
};
