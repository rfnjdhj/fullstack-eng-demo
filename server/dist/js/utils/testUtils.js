"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTodoStatus = exports.formatTodoDescription = exports.isValidTodoName = void 0;
const isValidTodoName = (name) => {
    return name.length > 0 && name.length <= 100;
};
exports.isValidTodoName = isValidTodoName;
const formatTodoDescription = (description) => {
    return description.trim().charAt(0).toUpperCase() + description.trim().slice(1);
};
exports.formatTodoDescription = formatTodoDescription;
const calculateTodoStatus = (status) => {
    return status ? 'Completed' : 'Pending';
};
exports.calculateTodoStatus = calculateTodoStatus;
