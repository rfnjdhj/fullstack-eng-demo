import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

const mockTodo: ITodo = {
  _id: '1',
  name: 'Test Todo',
  description: 'Test Description',
  status: false,
};

const mockUpdateTodo = jest.fn();
const mockDeleteTodo = jest.fn();

describe('TodoItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo item correctly with pending status', () => {
    render(<TodoItem todo={mockTodo} updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('should render todo item correctly with completed status', () => {
    const completedTodo = { ...mockTodo, status: true };

    render(
      <TodoItem todo={completedTodo} updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should call deleteTodo when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  it('should call updateTodo when complete button is clicked', () => {
    render(<TodoItem todo={mockTodo} updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />);

    fireEvent.click(screen.getByRole('button', { name: /complete/i }));

    expect(mockUpdateTodo).toHaveBeenCalledWith(mockTodo);
  });
});
