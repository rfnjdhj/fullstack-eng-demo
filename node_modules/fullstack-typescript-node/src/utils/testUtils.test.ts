import { describe, it, expect } from 'vitest';
import { isValidTodoName, formatTodoDescription, calculateTodoStatus } from './testUtils';

describe('testUtils', () => {
  describe('isValidTodoName', () => {
    it('should return true for valid todo name', () => {
      expect(isValidTodoName('Buy groceries')).toBe(true);
    });

    it('should return false for empty todo name', () => {
      expect(isValidTodoName('')).toBe(false);
    });

    it('should return false for too long todo name', () => {
      const longName = 'a'.repeat(101);
      expect(isValidTodoName(longName)).toBe(false);
    });
  });

  describe('formatTodoDescription', () => {
    it('should capitalize first letter of description', () => {
      expect(formatTodoDescription('buy milk')).toBe('Buy milk');
    });

    it('should trim whitespace from description', () => {
      expect(formatTodoDescription('  buy milk  ')).toBe('Buy milk');
    });
  });

  describe('calculateTodoStatus', () => {
    it('should return "Completed" when status is true', () => {
      expect(calculateTodoStatus(true)).toBe('Completed');
    });

    it('should return "Pending" when status is false', () => {
      expect(calculateTodoStatus(false)).toBe('Pending');
    });
  });
});
