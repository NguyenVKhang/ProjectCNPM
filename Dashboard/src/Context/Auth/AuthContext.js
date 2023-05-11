import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "./AuthReducer";

const initialState = {
  user: JSON.parse(localStorage.getItem("dashboard")) || null,
  isFetching: false,
  error: false,
};

export const authContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <authContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
