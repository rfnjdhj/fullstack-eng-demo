"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const testUtils_1 = require("./testUtils");
(0, vitest_1.describe)('testUtils', () => {
    (0, vitest_1.describe)('isValidTodoName', () => {
        (0, vitest_1.it)('should return true for valid todo name', () => {
            (0, vitest_1.expect)((0, testUtils_1.isValidTodoName)('Buy groceries')).toBe(true);
        });
        (0, vitest_1.it)('should return false for empty todo name', () => {
            (0, vitest_1.expect)((0, testUtils_1.isValidTodoName)('')).toBe(false);
        });
        (0, vitest_1.it)('should return false for too long todo name', () => {
            const longName = 'a'.repeat(101);
            (0, vitest_1.expect)((0, testUtils_1.isValidTodoName)(longName)).toBe(false);
        });
    });
    (0, vitest_1.describe)('formatTodoDescription', () => {
        (0, vitest_1.it)('should capitalize first letter of description', () => {
            (0, vitest_1.expect)((0, testUtils_1.formatTodoDescription)('buy milk')).toBe('Buy milk');
        });
        (0, vitest_1.it)('should trim whitespace from description', () => {
            (0, vitest_1.expect)((0, testUtils_1.formatTodoDescription)('  buy milk  ')).toBe('Buy milk');
        });
    });
    (0, vitest_1.describe)('calculateTodoStatus', () => {
        (0, vitest_1.it)('should return "Completed" when status is true', () => {
            (0, vitest_1.expect)((0, testUtils_1.calculateTodoStatus)(true)).toBe('Completed');
        });
        (0, vitest_1.it)('should return "Pending" when status is false', () => {
            (0, vitest_1.expect)((0, testUtils_1.calculateTodoStatus)(false)).toBe('Pending');
        });
    });
});
