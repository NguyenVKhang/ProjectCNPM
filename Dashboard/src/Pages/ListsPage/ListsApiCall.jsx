import {
  getListsStart,
  getListsFailure,
  getListsSuccess,
  deleteListsStart,
  deleteListsSuccess,
  deleteListsFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure,
  createListStart,
  createListFailure,
  createListSuccess,
} from "../../Context/Lists/ListsAction";
import axiosInstance from "./../../axios";

//Get Method
export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axiosInstance.get("lists");
    dispatch(getListsSuccess(res.data));
  } catch (error) {
    dispatch(getListsFailure());
  }
};

//Delete Method

export const deleteLists = async (id, dispatch) => {
  dispatch(deleteListsStart());
  try {
    await axiosInstance.get("lists/" + id);
    dispatch(deleteListsSuccess(id));
  } catch (error) {
    dispatch(deleteListsFailure());
  }
};

//Update List

export const updateList = async (id, list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axiosInstance.put("lists/" + id, list);
    dispatch(updateListSuccess(res.data));
  } catch (error) {
    dispatch(updateListFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axiosInstance.post("lists", list);
    dispatch(createListSuccess(res.data));
  } catch (error) {
    dispatch(createListFailure());
  }
};
