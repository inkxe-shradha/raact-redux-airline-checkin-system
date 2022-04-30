import Axios from "../config/api.config";

export const loadAncillaryLists = () => Axios.get("ancillaryList");

export const removeAncillaryService = (id) =>
  Axios.delete("ancillaryList/" + id);

export const saveAncillaryLists = (service) => {
  if (service.id) {
    return Axios.put("ancillaryList/" + service.id, service);
  } else {
    return Axios.post("ancillaryList", service);
  }
};
