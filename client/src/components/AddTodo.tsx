import React, { useState, useCallback } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: Partial<ITodo> | undefined) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<Partial<ITodo> | undefined>()

  const handleForm = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setFormData(prev => ({
      ...prev,
      [e.currentTarget.id]: e.currentTarget.value,
    }))
  }, [])

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' />
        </div>
      </div>
      <button disabled={formData === undefined || !formData.name || !formData.description} >Add Todo</button>
    </form>
  )
}

export default React.memo(AddTodo)
