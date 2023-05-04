import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { authContext } from "./../../Context/Auth/AuthContext";
import { login } from "./LoginApiCall";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isFetching, dispatch } = useContext(authContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    // e.preventDefault();
    // if (!email || !password) {
    //   alert("Please enter email and password");
    //   return;
    // }
    // fetch("http://localhost:3001/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status === "success") {
    //       alert("login success");
    //       window.localStorage.setItem("token", JSON.stringify(data.data));
    //       // navigate(-1);
    //       window.location.href = "/";
    //     }
    //     else {
    //       alert(data.message);
    //     }
    //   });
  };

  return (
    <div className="loginPage">
      <form className="loginForm">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
