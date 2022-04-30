import Axios from "../config/api.config";

export const getAllPassengerList = () => Axios.get("passengers");

export const savePassengerDetails = (passenger) => {
  if (passenger.id) {
    return Axios.put("passengers/" + passenger.id, passenger);
  } else {
    return Axios.post("passengers", passenger);
  }
};

export const deletePassengerById = (passengerId) => {
  return Axios.delete("passengers/" + passengerId);
};
