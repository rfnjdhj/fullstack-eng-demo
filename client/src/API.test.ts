import axios from 'axios';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Functions', () => {
  const mockApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should fetch todos successfully', async () => {
      const mockTodos = {
        data: {
          message: 'Success',
          status: 'success',
          todos: [{ _id: '1', name: 'Test Todo', description: 'Description', status: false }],
        },
      };
      mockedAxios.get.mockResolvedValue(mockTodos);

      const result = await getTodos();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${mockApiUrl}/todos`);
      expect(result).toEqual(mockTodos);
    });

    it('should handle errors when fetching todos', async () => {
      const mockError = new Error('Network error');
      mockedAxios.get.mockRejectedValue(mockError);

      await expect(getTodos()).rejects.toThrow();
    });
  });

  describe('addTodo', () => {
    it('should add a new todo successfully', async () => {
      const formData: Partial<ITodo> = {
        name: 'New Todo',
        description: 'New Description',
      };
      const mockResponse = {
        data: {
          message: 'Todo added',
          status: 'success',
          todo: { ...formData, _id: '1', status: false },
          todos: [{ ...formData, _id: '1', status: false }],
        },
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await addTodo(formData);

      expect(mockedAxios.post).toHaveBeenCalledWith(`${mockApiUrl}/add-todo`, {
        name: 'New Todo',
        description: 'New Description',
        status: false,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle missing name and description', async () => {
      const formData: Partial<ITodo> = {};
      const mockResponse = {
        data: {
          message: 'Todo added',
          status: 'success',
          todo: { _id: '1', name: '', description: '', status: false },
          todos: [],
        },
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await addTodo(formData);

      expect(mockedAxios.post).toHaveBeenCalledWith(`${mockApiUrl}/add-todo`, {
        name: '',
        description: '',
        status: false,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      const todo: ITodo = {
        _id: '1',
        name: 'Test Todo',
        description: 'Description',
        status: false,
      };
      const mockResponse = {
        data: {
          message: 'Todo updated',
          status: 'success',
          todo: { ...todo, status: true },
          todos: [{ ...todo, status: true }],
        },
      };
      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await updateTodo(todo);

      expect(mockedAxios.put).toHaveBeenCalledWith(`${mockApiUrl}/edit-todo/1`, {
        status: true,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      const todoId = '1';
      const mockResponse = {
        data: {
          message: 'Todo deleted',
          status: 'success',
          todo: { _id: '1', name: 'Test Todo', description: 'Description', status: false },
          todos: [],
        },
      };
      mockedAxios.delete.mockResolvedValue(mockResponse);

      const result = await deleteTodo(todoId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(`${mockApiUrl}/delete-todo/1`);
      expect(result).toEqual(mockResponse);
    });
  });
});
