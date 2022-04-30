const getLocalStorage = () => {
  const localStorage = window.localStorage;
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};
const initialState = {
  users: getLocalStorage() || {},
  isAuthenticated: getLocalStorage() ? true : false,
  apiCallsInProgress: 0,
  ancillaryLists: [],
  passengers: [],
};

export default initialState;
