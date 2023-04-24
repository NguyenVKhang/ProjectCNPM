import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Profile from "./pages/Auth/Profile/Profile";
import Logout from "./pages/Auth/Logout/Logout";
import General from "./pages/Auth/General";
import ChangeProfile from "./pages/Auth/Change-profile";
import MovieNowShowing from "./pages/Movie/Now-showing";
import MovieComingSoon from "./pages/Movie/Coming-soon";
import Chitiet from "./pages/Movie/Detail-movie";
import Ticket from "./pages/Movie/Ticket";
import AuthPayment from "./pages/Auth-payment";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import Nocart from "./pages/NoCart";
import Cinema from "./pages/Cinema";
import Test from "./pages/Test";
import History from "./pages/Auth/History";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="general" element={<General />} />
          <Route path="change-profile" element={<ChangeProfile />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/movies/now-showing" element={<MovieNowShowing />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/movies/coming-soon" element={<MovieComingSoon />} />
        <Route path="/movie/:title" element={<Chitiet />} />
        <Route path="/payment" element={<AuthPayment />} />
        <Route path="/payment/momo" element={<Payment />} />
        <Route path="/nocart" element={<Nocart />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </Router >
  );
}

export default App;
