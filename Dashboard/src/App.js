import "./App.css";
import React, { useContext } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Userspage from "./Pages/UsersPage/Userspage";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import SingleMoviePage from "./Pages/SingleMoviePage/SingleMoviePage";
import NewMoviePage from "./Pages/NewMoviePage/NewMoviePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { authContext } from "./Context/Auth/AuthContext";
import Lists from "./Pages/ListsPage/Lists";
import SchedulesPage from "./Pages/SchedulesPage/SchedulesPage";
import ScheduleSingle from "./Pages/ScheduleSingle/ScheduleSingle";
import ScheduleNew from "./Pages/ScheduleNew/ScheduleNew";
import RoomPage from "./Pages/RoomPage/RoomPage";
import SalesPage from "./Pages/SalesPage/SalesPage";
function App() {
  const { user } = useContext(authContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {!user ? <LoginPage /> : <Redirect to="/schedules" />}
        </Route>
        {user ? (
          <>
            <Navbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Redirect to="/schedules" />
              </Route>
              <Route path="/users">
                <Userspage />
              </Route>

              <Route path="/movies">
                <MoviesPage />
              </Route>
              <Route path="/movie">
                <SingleMoviePage />
              </Route>
              <Route path="/newMovie">
                <NewMoviePage />
              </Route>
              <Route path="/lists">
                <Lists />
              </Route>

              <Route path="/schedules">
                <SchedulesPage />
              </Route>
              <Route path="/rooms">
                <RoomPage />
              </Route>

              <Route path="/schedule/:id">
                <ScheduleSingle />
              </Route>

              <Route path="/scheduleNew">
                <ScheduleNew />
              </Route>
              <Route path="/sales">
                <SalesPage />
              </Route>

            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
