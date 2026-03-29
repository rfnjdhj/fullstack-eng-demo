import { describe, it, expect } from 'vitest';
import { sortDocumentsByStatusAndDate } from './dbOperations';

interface MockTodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

describe('dbOperations utilities', () => {
  describe('sortDocumentsByStatusAndDate', () => {
    it('should sort pending todos before completed ones', () => {
      const todos: MockTodo[] = [
        { _id: '1', name: 'Todo 1', description: 'Desc 1', status: true, createdAt: '2024-01-01' },
        { _id: '2', name: 'Todo 2', description: 'Desc 2', status: false, createdAt: '2024-01-02' },
      ];

      const sorted = sortDocumentsByStatusAndDate(todos);

      expect(sorted[0]._id).toBe('2');
      expect(sorted[1]._id).toBe('1');
    });

    it('should sort todos by createdAt descending when same status', () => {
      const todos: MockTodo[] = [
        { _id: '1', name: 'Todo 1', description: 'Desc 1', status: false, createdAt: '2024-01-01' },
        { _id: '2', name: 'Todo 2', description: 'Desc 2', status: false, createdAt: '2024-01-03' },
        { _id: '3', name: 'Todo 3', description: 'Desc 3', status: false, createdAt: '2024-01-02' },
      ];

      const sorted = sortDocumentsByStatusAndDate(todos);

      expect(sorted[0]._id).toBe('2');
      expect(sorted[1]._id).toBe('3');
      expect(sorted[2]._id).toBe('1');
    });

    it('should handle todos without createdAt field', () => {
      const todos: MockTodo[] = [
        { _id: '1', name: 'Todo 1', description: 'Desc 1', status: false },
        { _id: '2', name: 'Todo 2', description: 'Desc 2', status: false, createdAt: '2024-01-02' },
      ];

      const sorted = sortDocumentsByStatusAndDate(todos);

      expect(sorted[0]._id).toBe('2');
      expect(sorted[1]._id).toBe('1');
    });

    it('should return empty array when input is empty', () => {
      const sorted = sortDocumentsByStatusAndDate([]);
      expect(sorted).toEqual([]);
    });

    it('should return same array for single todo', () => {
      const todos: MockTodo[] = [
        { _id: '1', name: 'Todo 1', description: 'Desc 1', status: false },
      ];

      const sorted = sortDocumentsByStatusAndDate(todos);

      expect(sorted).toEqual(todos);
    });
  });
});
