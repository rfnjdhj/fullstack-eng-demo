import React, { useCallback } from 'react'

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
    deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ''
  
  const handleComplete = useCallback(() => {
    updateTodo(todo)
  }, [todo, updateTodo])
  
  const handleDelete = useCallback(() => {
    deleteTodo(todo._id)
  }, [todo._id, deleteTodo])

  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={handleComplete}
          className={todo.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={handleDelete}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default React.memo(Todo)
