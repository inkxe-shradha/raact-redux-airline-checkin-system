import initialState from "./initialState";

export default function authReducer(
  state = initialState,
  { type, payload = null }
) {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        users: payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        users: {},
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        users: payload,
      };
    default:
      return state;
  }
}
