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
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const dbOperations_1 = require("../../utils/dbOperations");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, dbOperations_1.getAllDocuments)(todo_1.default);
        res.status(200).json({ todos });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error fetching todos',
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.name || !body.description) {
            res.status(400).json({ message: 'Name and description are required' });
            return;
        }
        const newTodo = yield (0, dbOperations_1.createDocument)(todo_1.default, {
            name: body.name,
            description: body.description,
            status: body.status || false,
        });
        const allTodos = yield (0, dbOperations_1.getAllDocuments)(todo_1.default);
        res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error adding todo',
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedTodo = yield (0, dbOperations_1.updateDocumentById)(todo_1.default, id, body);
        if (!updatedTodo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        const allTodos = yield (0, dbOperations_1.getAllDocuments)(todo_1.default);
        res.status(200).json({
            message: 'Todo updated',
            todo: updatedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error updating todo',
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodo = yield (0, dbOperations_1.deleteDocumentById)(todo_1.default, req.params.id);
        if (!deletedTodo) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        const allTodos = yield (0, dbOperations_1.getAllDocuments)(todo_1.default);
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting todo',
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.deleteTodo = deleteTodo;
