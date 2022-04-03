import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
};

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
