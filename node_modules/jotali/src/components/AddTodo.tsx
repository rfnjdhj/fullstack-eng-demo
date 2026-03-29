import React, { useState, memo, useCallback } from 'react';

type Props = {
  saveTodo: (e: React.FormEvent, formData: Partial<ITodo>) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<Partial<ITodo>>({});

  const handleForm = useCallback((e: React.FormEvent<HTMLInputElement>): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.currentTarget.id]: e.currentTarget.value,
    }));
  }, []);

  const isFormValid = (): boolean => {
    return !!formData.name && !!formData.description;
  };

  return (
    <form className="Form" onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleForm} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} type="text" id="description" />
        </div>
      </div>
      <button disabled={!isFormValid()}>Add Todo</button>
    </form>
  );
};

export default memo(AddTodo);
