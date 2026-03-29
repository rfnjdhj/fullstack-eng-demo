"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const dbOperations_1 = require("./dbOperations");
(0, vitest_1.describe)('dbOperations utilities', () => {
    (0, vitest_1.describe)('sortDocumentsByStatusAndDate', () => {
        (0, vitest_1.it)('should sort pending todos before completed ones', () => {
            const todos = [
                { _id: '1', name: 'Todo 1', description: 'Desc 1', status: true, createdAt: '2024-01-01' },
                { _id: '2', name: 'Todo 2', description: 'Desc 2', status: false, createdAt: '2024-01-02' },
            ];
            const sorted = (0, dbOperations_1.sortDocumentsByStatusAndDate)(todos);
            (0, vitest_1.expect)(sorted[0]._id).toBe('2');
            (0, vitest_1.expect)(sorted[1]._id).toBe('1');
        });
        (0, vitest_1.it)('should sort todos by createdAt descending when same status', () => {
            const todos = [
                { _id: '1', name: 'Todo 1', description: 'Desc 1', status: false, createdAt: '2024-01-01' },
                { _id: '2', name: 'Todo 2', description: 'Desc 2', status: false, createdAt: '2024-01-03' },
                { _id: '3', name: 'Todo 3', description: 'Desc 3', status: false, createdAt: '2024-01-02' },
            ];
            const sorted = (0, dbOperations_1.sortDocumentsByStatusAndDate)(todos);
            (0, vitest_1.expect)(sorted[0]._id).toBe('2');
            (0, vitest_1.expect)(sorted[1]._id).toBe('3');
            (0, vitest_1.expect)(sorted[2]._id).toBe('1');
        });
        (0, vitest_1.it)('should handle todos without createdAt field', () => {
            const todos = [
                { _id: '1', name: 'Todo 1', description: 'Desc 1', status: false },
                { _id: '2', name: 'Todo 2', description: 'Desc 2', status: false, createdAt: '2024-01-02' },
            ];
            const sorted = (0, dbOperations_1.sortDocumentsByStatusAndDate)(todos);
            (0, vitest_1.expect)(sorted[0]._id).toBe('2');
            (0, vitest_1.expect)(sorted[1]._id).toBe('1');
        });
        (0, vitest_1.it)('should return empty array when input is empty', () => {
            const sorted = (0, dbOperations_1.sortDocumentsByStatusAndDate)([]);
            (0, vitest_1.expect)(sorted).toEqual([]);
        });
        (0, vitest_1.it)('should return same array for single todo', () => {
            const todos = [
                { _id: '1', name: 'Todo 1', description: 'Desc 1', status: false },
            ];
            const sorted = (0, dbOperations_1.sortDocumentsByStatusAndDate)(todos);
            (0, vitest_1.expect)(sorted).toEqual(todos);
        });
    });
});
