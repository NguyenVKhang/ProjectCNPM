import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./Context/Auth/AuthContext";
import { ListsContextProvider } from "./Context/Lists/ListsContext";
import { MoviesContextProvider } from "./Context/Movies/MoviesContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MoviesContextProvider>
        <ListsContextProvider>
          <App />
        </ListsContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
