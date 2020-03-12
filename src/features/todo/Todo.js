import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  createTodo,
  editTodo,
  deleteTodo,
  toggleVisible,
  getAllTodos
} from "./todoSlice";

export function Todo() {
  const dispatch = useDispatch();
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const todos = useSelector(state => state.todos.list);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [todos.length, dispatch]);
  const handleTodoSubmit = e => {
    e.preventDefault();
    if (editingTodo) {
      console.log("Handling edit..");
      dispatch(
        editTodo({ ...editingTodo, title: titleText, description: descText })
      );
      setEditingTodo(null);
    } else {
      let id = todos.reduce((max, obj) => {
        return max.id > obj.id ? max.id : obj.id;
      }, 0);
      id++;
      dispatch(createTodo({ title: titleText, description: descText, id }));
    }

    setTitleText("");
    setDescText("");
  };

  const handleToDoEdit = editTodo => {
    setTitleText(editTodo.title);
    setDescText(editTodo.description);
    setEditingTodo(editTodo);
    // console.log("Edit: ", editTodo);
  };

  const handleTodoRemove = todoId => {
    dispatch(deleteTodo(todoId));
    // console.log("Remove: ", todoId);
  };
  return (
    <section className="section">
      <div className="container">
        {/** Section handles creating and editing todos */}
        <span className="section is-size-2 ">
          {editingTodo ? <p>Editing todo:</p> : <p>Create todo:</p>}
        </span>
        <form onSubmit={handleTodoSubmit} className="columns ">
          <input
            value={titleText}
            className="column"
            placeholder="Title"
            onChange={e => setTitleText(e.target.value)}
          />
          <input
            className="column"
            placeholder="Description..."
            value={descText}
            onChange={e => setDescText(e.target.value)}
          />
          <button className="column" type="submit">
            {editingTodo ? "Save Edits" : "Add todo"}
          </button>
        </form>
        {todos.length ? (
          <span className="container">
            Showing <b>{todos.length > 10 ? 10 : todos.length}</b> of{" "}
            <b>{todos.length}</b> todos below: <br />
          </span>
        ) : null}
        <div className="section columns is-multiline is-5">
          {/** Only 10 todos to be displayed at once - better implementation with pagination*/}
          {todos.slice(0, 10).map(todo => {
            return (
              <div key={todo.id}>
                <div className="column">
                  <div className="card card-header-title">
                    {todo.title}
                    <a
                      href="#"
                      className="button card-header-icon is-white"
                      aria-label="more details"
                      onClick={() => {
                        dispatch(toggleVisible(todo.id));
                      }}
                    >
                      <span className="icon">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                  {todo.visible && (
                    <>
                      <div className="card-content ">
                        <div className="content">{todo.description}</div>
                      </div>
                      <footer className="card-footer">
                        <button
                          className="button is-flex flex-grow"
                          onClick={() => handleToDoEdit(todo)}
                        >
                          Edit
                        </button>
                        <button
                          className="button is-danger is-inverted is-flex flex-grow"
                          onClick={() => handleTodoRemove(todo.id)}
                        >
                          Delete
                        </button>
                      </footer>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Todo;
