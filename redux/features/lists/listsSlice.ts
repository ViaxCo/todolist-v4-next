import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { getDay } from "../../../utils/date";
import { AppDispatch } from "../../store";
import Router from "next/router";

const day = getDay();

// List type
export type ListType = {
  _id?: string;
  name: string;
};

// Slice state
type ListSliceState = {
  lists: ListType[];
  today: string;
  homeIsLoading: boolean;
};

const initialState: ListSliceState = {
  lists: [],
  today: day,
  homeIsLoading: true,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    listsReceived(state, { payload: lists }) {
      state.homeIsLoading = false;
      state.lists = lists;
    },
    addList(state, { payload: name }) {
      Router.push(`/${name}`);
    },
    listDeleted(state, { payload: id }) {
      state.lists = state.lists.filter(list => list._id !== id);
    },
    setHomeIsLoading(state, { payload: value }) {
      state.homeIsLoading = value;
    },
  },
});

export const getLists = () => async (dispatch: AppDispatch) => {
  const res = await axios.get("/api");
  const lists: ListType[] = res.data.lists;
  dispatch(listsReceived(lists));
};

export const deleteList = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(listDeleted(id));
  await axios.delete(`/api?id=${id}`);
};

export const {
  listsReceived,
  addList,
  listDeleted,
  setHomeIsLoading,
} = listsSlice.actions;
export default listsSlice.reducer;
