import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { getTodos, addTodo, updateTodo, deleteTodo } from './index';
import Todo from '@/models/todo';

vi.mock('@/models/todo');

type MockRequest = Partial<Request>;
type MockResponse = Partial<Response>;

describe('Todo Controllers', () => {
  let mockRequest: MockRequest;
  let mockResponse: MockResponse;
  let mockJson = vi.fn();
  let mockStatus = vi.fn(() => ({ json: mockJson }));

  beforeEach(() => {
    mockJson = vi.fn();
    mockStatus = vi.fn(() => ({ json: mockJson }));
    mockResponse = { status: mockStatus as unknown as Response['status'] };
    vi.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should get all todos successfully', async () => {
      const mockTodos = [
        { _id: '1', name: 'Test Todo 1', description: 'Description 1', status: false },
        { _id: '2', name: 'Test Todo 2', description: 'Description 2', status: true },
      ];
      vi.mocked(Todo.find).mockReturnValue({ exec: vi.fn().mockResolvedValue(mockTodos) } as any);

      await getTodos(mockRequest as Request, mockResponse as Response);

      expect(Todo.find).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ todos: mockTodos });
    });

    it('should handle errors when getting todos', async () => {
      const mockError = new Error('Database error');
      vi.mocked(Todo.find).mockReturnValue({ exec: vi.fn().mockRejectedValue(mockError) } as any);

      await getTodos(mockRequest as Request, mockResponse as Response);

      expect(Todo.find).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error fetching todos',
        error: 'Database error',
      });
    });
  });

  describe('addTodo', () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          name: 'New Todo',
          description: 'New Description',
          status: false,
        },
      };
    });

    it('should add a new todo successfully', async () => {
      const mockNewTodo = { _id: '3', ...mockRequest.body };
      const mockAllTodos = [mockNewTodo];

      const mockTodoInstance = {
        save: vi.fn().mockResolvedValue(mockNewTodo),
      };
      vi.mocked(Todo).mockImplementation(() => mockTodoInstance as any);
      vi.mocked(Todo.find).mockReturnValue({ exec: vi.fn().mockResolvedValue(mockAllTodos) } as any);

      await addTodo(mockRequest as Request, mockResponse as Response);

      expect(Todo).toHaveBeenCalledWith({
        name: 'New Todo',
        description: 'New Description',
        status: false,
      });
      expect(mockTodoInstance.save).toHaveBeenCalledTimes(1);
      expect(Todo.find).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Todo added',
        todo: mockNewTodo,
        todos: mockAllTodos,
      });
    });
  });

  describe('updateTodo', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
        body: { status: true },
      };
    });

    it('should update a todo successfully', async () => {
      const mockUpdatedTodo = {
        _id: '1',
        name: 'Test Todo',
        description: 'Description',
        status: true,
      };
      const mockAllTodos = [mockUpdatedTodo];

      vi.mocked(Todo.findByIdAndUpdate).mockReturnValue({ exec: vi.fn().mockResolvedValue(mockUpdatedTodo) } as any);
      vi.mocked(Todo.find).mockReturnValue({ exec: vi.fn().mockResolvedValue(mockAllTodos) } as any);

      await updateTodo(mockRequest as Request, mockResponse as Response);

      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith('1', { status: true }, { new: true });
      expect(Todo.find).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Todo updated',
        todo: mockUpdatedTodo,
        todos: mockAllTodos,
      });
    });
  });

  describe('deleteTodo', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
      };
    });

    it('should delete a todo successfully', async () => {
      const mockDeletedTodo = {
        _id: '1',
        name: 'Test Todo',
        description: 'Description',
        status: false,
      };
      const mockAllTodos: unknown[] = [];

      vi.mocked(Todo.findByIdAndRemove).mockReturnValue({ exec: vi.fn().mockResolvedValue(mockDeletedTodo) } as any);
      vi.mocked(Todo.find).mockReturnValue({ exec: vi.fn().mockResolvedValue(mockAllTodos) } as any);

      await deleteTodo(mockRequest as Request, mockResponse as Response);

      expect(Todo.findByIdAndRemove).toHaveBeenCalledWith('1');
      expect(Todo.find).toHaveBeenCalledTimes(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Todo deleted',
        todo: mockDeletedTodo,
        todos: mockAllTodos,
      });
    });
  });
});
