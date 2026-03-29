import React, { memo } from 'react';

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return (
    prevProps.todo._id === nextProps.todo._id &&
    prevProps.todo.status === nextProps.todo.status &&
    prevProps.todo.name === nextProps.todo.name &&
    prevProps.todo.description === nextProps.todo.description
  );
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : '';
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button onClick={() => deleteTodo(todo._id)} className="Card--button__delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(Todo, areEqual);
