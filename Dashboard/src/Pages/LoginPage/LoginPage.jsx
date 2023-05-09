import React, { useContext, useState } from "react";
import { authContext } from "./../../Context/Auth/AuthContext";
import { login } from "./LoginApiCall";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(authContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="loginPage">
      <div className="card">
        <div
          className="card-header"
          style={{ display: "flex", textAlign: "center", padding: "5px" }}
        >
          <h5 style={{ flex: "1", margin: "7px" }}>ĐĂNG NHẬP</h5>
        </div>
        <div className="login-form">
          <form>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" onClick={handleLogin} disabled={isFetching}>
              Đăng nhập
            </button>
          </form>
        </div>
        <div className="register-link"></div>
      </div>
      
    </div>
  );
}

export default LoginPage;
