import React, { useContext, useState, useEffect } from "react";
import "./NewList.css";
import { moviesContext } from "./../../Context/Movies/MoviesContext";
import { listsContext } from "../../Context/Lists/ListsContext";
import { getMovies } from "./../MoviesPage/MoviesApiCall";
import { createList } from "../ListsPage/ListsApiCall";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function NewList() {
  const [list, setList] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const { movies, dispatch: dispatchMovie } = useContext(moviesContext);
  const { dispatch, isFetching } = useContext(listsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  return (
    <div className="newListPage">
      <h1 className="newListTitle">Create a New List of Movies/Series</h1>
      <form className="listForm">
        <div className="listItem">
          <label>List Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="listItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="listItem">
          <label>Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="listType"
          >
            <option>Type</option>
            <option value="movie">Movie</option>
            <option value="Series">Series</option>
          </select>
        </div>
        <div className="listItem">
          <label>Content</label>
          <select
            multiple
            name="content"
            id="content"
            onChange={handleSelect}
            style={{ height: "150px" }}
          >
            {movies?.map((movie) => (
              <option value={movie._id} key={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <button className="createNewList" onClick={handleSubmit}>
          {isFetching ? <CircularProgress color="success" /> : "Create"}
        </button>
      </form>
    </div>
  );
}

export default NewList;
