import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';

const mockSaveTodo = jest.fn();

describe('AddTodo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render add todo form correctly', () => {
    render(<AddTodo saveTodo={mockSaveTodo} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Todo/i })).toBeInTheDocument();
  });

  it('should update name input when user types', () => {
    render(<AddTodo saveTodo={mockSaveTodo} />);

    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: 'New Todo Name' } });

    expect(nameInput).toHaveValue('New Todo Name');
  });

  it('should update description input when user types', () => {
    render(<AddTodo saveTodo={mockSaveTodo} />);

    const descriptionInput = screen.getByLabelText(/Description/i);
    fireEvent.change(descriptionInput, { target: { value: 'New Todo Description' } });

    expect(descriptionInput).toHaveValue('New Todo Description');
  });

  it('should disable submit button when name or description is empty', () => {
    render(<AddTodo saveTodo={mockSaveTodo} />);

    const submitButton = screen.getByRole('button', { name: /Add Todo/i });

    expect(submitButton).toBeDisabled();
  });
});
