import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todosReducer from "./features/todo/todoSlice";

export default configureStore({
  reducer: {
    todos: todosReducer
  },
  middleware: getDefaultMiddleware()
});
