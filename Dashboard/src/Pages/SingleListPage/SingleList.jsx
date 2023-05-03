import "./SingleList.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { listsContext } from "./../../Context/Lists/ListsContext";
import { updateList } from "./../ListsPage/ListsApiCall";
import { useParams } from "react-router-dom";

function SingleList() {
  const [updatedList, setUpdatedList] = useState(null);
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, [params]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedList({ updatedList, [e.target.name]: value });
  };

  const { dispatch } = useContext(listsContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(updatedList, dispatch);
  };

  return (
    <div className="SingleList">
      <div className="listAndCreateWrapper">
        <h2 className="listTitle">List</h2>
        <Link to="/newList">
          <button className="createList">Create</button>
        </Link>
      </div>
      <div className="updateWrapper">
        <div className="updateInfo">
          <form action="" className="formContainer">
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
              <input
                type="text"
                placeholder="type"
                name="type"
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <button className="updateButton" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default SingleList;
