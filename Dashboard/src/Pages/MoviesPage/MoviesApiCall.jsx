import {
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  deleteMovieStart,
  deleteMovieFailure,
  deleteMovieSuccess,
  postMovieStart,
  postMovieSuccess,
  postMovieFailure,
  updateMovieStart,
  updateMovieFailure,
  updateMovieSuccess,
} from "../../Context/Movies/MoviesAction";
import axiosInstance from "./../../axios";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axiosInstance.get("movies/random");
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axiosInstance.delete("movies/" + id);
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure());
  }
};

export const postMovie = async (movie, dispatch) => {
  dispatch(postMovieStart());
  try {
    const res = await axiosInstance.post("movies/", movie);
    dispatch(postMovieSuccess(res.data));
  } catch (error) {
    dispatch(postMovieFailure());
  }
};

export const updateMovie = async (movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await axiosInstance.put("movies/", movie);
    dispatch(updateMovieSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieFailure());
  }
};
