import React, { useEffect, useState, useCallback, useMemo } from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const fetchTodos = useCallback((): void => {
    getTodos()
      .then(({ data: { todos } }) => setTodos(todos))
      .catch((err: Error) => console.log(err));
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSaveTodo = useCallback((e: React.FormEvent, formData: Partial<ITodo>): void => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      return;
    }
    addTodo(formData as ITodo)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateTodo = useCallback((todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteTodo = useCallback((_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.status !== b.status) return a.status ? 1 : -1;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [todos]);

  return (
    <main className="App">
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {sortedTodos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
