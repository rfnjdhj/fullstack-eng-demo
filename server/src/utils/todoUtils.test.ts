import { describe, it, expect, vi, beforeEach } from 'vitest'
import Todo from '../models/todo'
import { getAllTodos, createTodo, updateTodoById, deleteTodoById } from './todoUtils'
import { ITodo } from '../types/todo'

// Mock Todo model
vi.mock('../models/todo')

describe('todoUtils', () => {
  const mockTodo: ITodo = {
    _id: '123',
    name: 'Test Todo',
    description: 'Test Description',
    status: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      // Arrange
      const mockTodos = [mockTodo]
      vi.mocked(Todo.find).mockResolvedValue(mockTodos as any)

      // Act
      const result = await getAllTodos()

      // Assert
      expect(Todo.find).toHaveBeenCalled()
      expect(result).toEqual(mockTodos)
    })
  })

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      // Arrange
      const todoData = {
        name: 'New Todo',
        description: 'New Description',
        status: false
      }
      
      const saveMock = vi.fn().mockResolvedValue(mockTodo)
      vi.mocked(Todo).mockImplementation(() => ({
        save: saveMock
      } as any))

      // Act
      const result = await createTodo(todoData)

      // Assert
      expect(Todo).toHaveBeenCalledWith(todoData)
      expect(saveMock).toHaveBeenCalled()
      expect(result).toEqual(mockTodo)
    })
  })

  describe('updateTodoById', () => {
    it('should update a todo by id', async () => {
      // Arrange
      const updateData = { status: true }
      const updatedTodo = { ...mockTodo, status: true }
      vi.mocked(Todo.findByIdAndUpdate).mockResolvedValue(updatedTodo as any)

      // Act
      const result = await updateTodoById('123', updateData)

      // Assert
      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: '123' },
        updateData,
        { new: true }
      )
      expect(result).toEqual(updatedTodo)
    })
  })

  describe('deleteTodoById', () => {
    it('should delete a todo by id', async () => {
      // Arrange
      vi.mocked(Todo.findByIdAndRemove).mockResolvedValue(mockTodo as any)

      // Act
      const result = await deleteTodoById('123')

      // Assert
      expect(Todo.findByIdAndRemove).toHaveBeenCalledWith('123')
      expect(result).toEqual(mockTodo)
    })
  })
})
