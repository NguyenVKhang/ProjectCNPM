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
    const res = {
      data: {
        isAdmin: true,
        username: "joey",
        profilePic:
          "https://images.unsplash.com/photo-1632836926800-0e9e2b4b5b0b?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&w=1000&q=80",
      },
    };
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
