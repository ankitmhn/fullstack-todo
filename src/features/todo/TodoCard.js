import React from "react";
import { useDispatch } from "react-redux";

const TodoCard = props => {
  const { todo, onExpand, onEdit, onDelete } = props;
  //   const dispatch = useDispatch();
  return (
    <div key={todo.id}>
      <div className="column">
        <div className="card card-header-title">
          {todo.title}
          <a
            href="#"
            className="button card-header-icon is-white"
            aria-label="more details"
            onClick={() => onExpand()}
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
                onClick={() => onEdit(todo)}
              >
                Edit
              </button>
              <button
                className="button is-danger is-inverted is-flex flex-grow"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
