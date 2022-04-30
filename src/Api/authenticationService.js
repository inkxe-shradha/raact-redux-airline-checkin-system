import Axios from "../config/api.config";

export const getUserDetails = (useId) => {
  return Axios.get("/users/" + useId);
};
