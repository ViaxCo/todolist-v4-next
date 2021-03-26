import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./features/lists/listsSlice";
import itemsReducer from "./features/items/itemsSlice";

const store = configureStore({
  reducer: {
    lists: listsReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
