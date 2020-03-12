import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "access_token";
const config = {
  headers: { Authorization: `Bearer ${TOKEN}` }
};
let todoId = 1;
export const slice = createSlice({
  name: "todo",
  initialState: { list: [], isLoading: false },
  reducers: {
    toggleLoading: state => {
      state.isLoading = !state.isLoading;
    },
    toggleVisible: (state, action) => {
      const todo = state.list.find(todo => todo.id === action.payload);
      if (todo) todo.visible = !todo.visible;
    },
    //SUBSEQUENT ACTIONS are not used - replaced by redux-thunks
    create: (state, action) => {
      const { title, description } = action.payload;
      state.list.push({ id: todoId, title, description, visible: false });
      todoId++;
    },
    remove: (state, action) => {
      const index = state.list.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    edit: (state, action) => {
      const todo = state.list.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.id = action.payload.id;
        todo.description = action.payload.description;
        todo.title = action.payload.title;
        todo.visible = action.payload.visible;
      }
    },
    dispalyTodos: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const {
  create,
  toggleVisible,
  edit,
  remove,
  toggleLoading,
  dispalyTodos
} = slice.actions;

export default slice.reducer;

export const getAllTodos = () => {
  return async dispatch => {
    dispatch(toggleLoading());
    try {
      const response = await axios.get("http://localhost:8000", config);
      console.log(response.data);
      dispatch(dispalyTodos(response.data));
      dispatch(toggleLoading());
    } catch (e) {
      console.log(e);
    }
  };
};

export const editTodo = todo => {
  return async dispatch => {
    try {
      const response = await axios.patch(
        "http://localhost:8000",
        { ...todo },
        config
      );
      console.log(response.data);
      dispatch(getAllTodos());
    } catch (e) {
      console.log(e);
    }
  };
};

export const createTodo = todo => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://localhost:8000",
        { ...todo },
        config
      );
      console.log(response.data);
      dispatch(getAllTodos());
    } catch (e) {
      console.log(e, e.message);
    }
  };
};

export const deleteTodo = todoId => {
  return async dispatch => {
    try {
      //since axios.delete doesn't support body params:
      // https://github.com/axios/axios/issues/897#issuecomment-343715381
      const response = await axios.delete("http://localhost:8000", {
        ...config,
        data: { id: todoId }
      });
      console.log(response.data);
      dispatch(getAllTodos());
    } catch (e) {
      console.log(e, e.message);
    }
  };
};
