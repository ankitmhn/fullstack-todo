import { createSlice } from "@reduxjs/toolkit";

let todoId = 1;
export const slice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    create: (state, action) => {
      const { title, description } = action.payload;
      state.push({ id: todoId, title, description, visible: false });
      todoId++;
    },
    toggleVisible: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) todo.visible = !todo.visible;
    },
    remove: (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    edit: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.id = action.payload.id;
        todo.description = action.payload.description;
        todo.title = action.payload.title;
        todo.visible = action.payload.visible;
      }
    }
  }
});

export const { create, toggleVisible, edit, remove } = slice.actions;

export default slice.reducer;
