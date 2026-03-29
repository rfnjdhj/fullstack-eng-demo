import axios from 'axios';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should fetch todos successfully', async () => {
      const mockTodos = [{ _id: '1', title: 'Test Todo', completed: false }];
      mockedAxios.get.mockResolvedValue({ data: { todos: mockTodos } });

      const result = await getTodos();
      
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/api/v1/todos'));
      expect(result.data.todos).toEqual(mockTodos);
    });

    it('should handle fetch errors', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      await expect(getTodos()).rejects.toThrow(errorMessage);
    });
  });

  describe('addTodo', () => {
    it('should add a new todo successfully', async () => {
      const newTodo = { title: 'New Todo', completed: false };
      const mockResponse = { _id: '2', ...newTodo };
      mockedAxios.post.mockResolvedValue({ status: 201, data: { todo: mockResponse } });

      const result = await addTodo(newTodo);
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/todos'),
        newTodo
      );
      expect(result.status).toBe(201);
      expect(result.data.todo).toEqual(mockResponse);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      const updatedTodo = { _id: '1', title: 'Updated Todo', completed: true };
      mockedAxios.put.mockResolvedValue({ status: 200, data: { todo: updatedTodo } });

      const result = await updateTodo(updatedTodo);
      
      expect(mockedAxios.put).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/todos/1'),
        updatedTodo
      );
      expect(result.status).toBe(200);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      const todoId = '1';
      mockedAxios.delete.mockResolvedValue({ status: 200 });

      const result = await deleteTodo(todoId);
      
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/todos/1')
      );
      expect(result.status).toBe(200);
    });
  });
});
