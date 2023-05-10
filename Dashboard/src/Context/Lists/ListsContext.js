import { createContext, useReducer } from "react";
import { listsReducer } from "./ListsReducer";

const listsInitialState = {
  lists: [],
  isFetching: false,
  error: false,
};

export const listsContext = createContext(listsInitialState);

export const ListsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listsReducer, listsInitialState);
  return (
    <listsContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </listsContext.Provider>
  );
};
