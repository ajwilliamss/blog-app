const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        user: payload,
        isLoading: false,
        isError: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "LOGOUT":
      return {
        user: localStorage.removeItem("user"),
        isLoading: false,
        isError: false,
      };
    case "UPDATE":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: payload,
        isLoading: false,
        isError: false,
      };
    case "UPDATE_ERROR":
      return {
        user: state.user,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
