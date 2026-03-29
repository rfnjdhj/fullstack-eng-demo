"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
const todo_1 = __importDefault(require("@/models/todo"));
vitest_1.vi.mock('@/models/todo');
(0, vitest_1.describe)('Todo Controllers', () => {
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;
    (0, vitest_1.beforeEach)(() => {
        mockJson = vitest_1.vi.fn();
        mockStatus = vitest_1.vi.fn(() => ({ json: mockJson }));
        mockResponse = { status: mockStatus };
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('getTodos', () => {
        (0, vitest_1.it)('should get all todos successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockTodos = [
                { _id: '1', name: 'Test Todo 1', description: 'Description 1', status: false },
                { _id: '2', name: 'Test Todo 2', description: 'Description 2', status: true },
            ];
            todo_1.default.find.mockResolvedValue(mockTodos);
            yield (0, index_1.getTodos)(mockRequest, mockResponse);
            (0, vitest_1.expect)(todo_1.default.find).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ todos: mockTodos });
        }));
        (0, vitest_1.it)('should handle errors when getting todos', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            todo_1.default.find.mockRejectedValue(mockError);
            yield (0, vitest_1.expect)((0, index_1.getTodos)(mockRequest, mockResponse)).rejects.toThrow('Database error');
        }));
    });
    (0, vitest_1.describe)('addTodo', () => {
        (0, vitest_1.beforeEach)(() => {
            mockRequest = {
                body: {
                    name: 'New Todo',
                    description: 'New Description',
                    status: false,
                },
            };
        });
        (0, vitest_1.it)('should add a new todo successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockNewTodo = Object.assign({ _id: '3' }, mockRequest.body);
            const mockAllTodos = [mockNewTodo];
            const mockTodoInstance = {
                save: vitest_1.vi.fn().mockResolvedValue(mockNewTodo),
            };
            todo_1.default.mockImplementation(() => mockTodoInstance);
            todo_1.default.find.mockResolvedValue(mockAllTodos);
            yield (0, index_1.addTodo)(mockRequest, mockResponse);
            (0, vitest_1.expect)(todo_1.default).toHaveBeenCalledWith({
                name: 'New Todo',
                description: 'New Description',
                status: false,
            });
            (0, vitest_1.expect)(mockTodoInstance.save).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(todo_1.default.find).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(201);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({
                message: 'Todo added',
                todo: mockNewTodo,
                todos: mockAllTodos,
            });
        }));
    });
    (0, vitest_1.describe)('updateTodo', () => {
        (0, vitest_1.beforeEach)(() => {
            mockRequest = {
                params: { id: '1' },
                body: { status: true },
            };
        });
        (0, vitest_1.it)('should update a todo successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUpdatedTodo = {
                _id: '1',
                name: 'Test Todo',
                description: 'Description',
                status: true,
            };
            const mockAllTodos = [mockUpdatedTodo];
            todo_1.default.findByIdAndUpdate.mockResolvedValue(mockUpdatedTodo);
            todo_1.default.find.mockResolvedValue(mockAllTodos);
            yield (0, index_1.updateTodo)(mockRequest, mockResponse);
            (0, vitest_1.expect)(todo_1.default.findByIdAndUpdate).toHaveBeenCalledWith({ _id: '1' }, { status: true });
            (0, vitest_1.expect)(todo_1.default.find).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({
                message: 'Todo updated',
                todo: mockUpdatedTodo,
                todos: mockAllTodos,
            });
        }));
    });
    (0, vitest_1.describe)('deleteTodo', () => {
        (0, vitest_1.beforeEach)(() => {
            mockRequest = {
                params: { id: '1' },
            };
        });
        (0, vitest_1.it)('should delete a todo successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockDeletedTodo = {
                _id: '1',
                name: 'Test Todo',
                description: 'Description',
                status: false,
            };
            const mockAllTodos = [];
            todo_1.default.findByIdAndRemove.mockResolvedValue(mockDeletedTodo);
            todo_1.default.find.mockResolvedValue(mockAllTodos);
            yield (0, index_1.deleteTodo)(mockRequest, mockResponse);
            (0, vitest_1.expect)(todo_1.default.findByIdAndRemove).toHaveBeenCalledWith('1');
            (0, vitest_1.expect)(todo_1.default.find).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({
                message: 'Todo deleted',
                todo: mockDeletedTodo,
                todos: mockAllTodos,
            });
        }));
    });
});
