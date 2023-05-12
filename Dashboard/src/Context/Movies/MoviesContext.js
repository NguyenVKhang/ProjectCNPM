import { createContext, useReducer } from "react";
import { moviesReducer } from "./MoviesReducer";

const moviesInitialState = {
  movies: [],
  isFetching: false,
  error: false,
};

export const moviesContext = createContext(moviesInitialState);

export const MoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, moviesInitialState);
  return (
    <moviesContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </moviesContext.Provider>
  );
};
