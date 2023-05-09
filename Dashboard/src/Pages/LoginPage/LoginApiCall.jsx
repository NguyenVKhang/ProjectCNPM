import {
  loginStart,
  loginFailure,
  loginSuccess,
} from "../../Context/Auth/AuthActions";
import axiosInstance from "./../../axios";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    // const res = await axiosInstance.post("auth/login", user);
    // data for testing
    // fetch http://localhost:3001/auth/login with user is body

    const result = await fetch("http://localhost:3001/auth/loginAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res_ = await result.json();
    console.log(res_);
    if (res_.status === "success") {
      alert("login success");

    } else {
      alert(res_.message);
      return;

    }
    const res = {
      data: {
        isAdmin: true,
        username: "admin",
        profilePic:
          "https://busmedia.vn/wp-content/uploads/2021/09/quang-cao-tai-rap-chieu-phim-unique-ooh-34.jpg",
      },
    };
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
