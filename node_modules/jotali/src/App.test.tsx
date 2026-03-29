import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as API from './API';

jest.mock('./API', () => ({
  getTodos: jest.fn(),
  addTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
}));

beforeEach(() => {
  (API.getTodos as jest.Mock).mockResolvedValue({ data: { todos: [] } });
});

test('renders My Todos heading', async () => {
  render(<App />);
  await waitFor(() => {
    const headingElement = screen.getByText(/My Todos/i);
    expect(headingElement).toBeInTheDocument();
  });
});

test('renders Add Todo form', async () => {
  render(<App />);
  await waitFor(() => {
    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('button', { name: /Add Todo/i });

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
