import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../../store";

// Item type
export type ItemType = {
  _id?: string;
  task: string;
  completed: boolean;
};

// Slice state
type ItemSliceState = {
  items: ItemType[];
  listTitle: string;
  listIsLoading: boolean;
};

const initialState: ItemSliceState = {
  items: [],
  listTitle: "",
  listIsLoading: true,
};

export const addItem = createAsyncThunk(
  "items/addItem",
  async ({ customListName, name }: { customListName: string; name: string }) => {
    const res = await axios.post(
      `/api/${customListName}`,
      { text: name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { item } = res.data;
    return item as ItemType;
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsReceived(state, { payload: { items, listTitle } }) {
      state.listIsLoading = false;
      state.items = items;
      state.listTitle = listTitle;
    },
    itemDeleted(state, { payload: id }) {
      state.items = state.items.filter(item => item._id !== id);
    },
    itemCompletedToggled(state, { payload: { item, index } }) {
      state.items[index] = item;
    },
    setListIsLoading(state, { payload: value }) {
      state.listIsLoading = value;
    },
  },
  extraReducers: builder => {
    builder.addCase(addItem.fulfilled, (state, { payload: item }) => {
      state.items.push(item);
    });
  },
});

export const getItems = (customListName: string) => async (dispatch: AppDispatch) => {
  const res = await axios.get(`/api/${customListName}`);
  const { items, listTitle } = res.data;
  dispatch(itemsReceived({ items, listTitle }));
};

export const deleteItem = (customListName: string, id: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(itemDeleted(id));
  await axios.delete(`/api/${customListName}?id=${id}`);
};

export const toggleItemCompleted = (
  customListName: string,
  id: string,
  index: number,
  checked: boolean
) => async (dispatch: AppDispatch) => {
  const res = await axios.patch(`/api/${customListName}?id=${id}`, {
    completed: checked,
  });
  const items: ItemType[] = res.data.items;
  const item = items.find(item => item._id === id);
  dispatch(itemCompletedToggled({ item, index }));
};

export const {
  itemsReceived,
  itemDeleted,
  itemCompletedToggled,
  setListIsLoading,
} = itemsSlice.actions;
export default itemsSlice.reducer;
