import Todo from '../models/todo'
import { ITodo } from '../types/todo'

/**
 * 获取所有待办事项
 * @returns 所有待办事项列表
 */
export const getAllTodos = async (): Promise<ITodo[]> => {
  return Todo.find()
}

/**
 * 根据 ID 查找待办事项
 * @param id 待办事项 ID
 * @returns 找到的待办事项或 null
 */
export const getTodoById = async (id: string): Promise<ITodo | null> => {
  return Todo.findById(id)
}

/**
 * 创建新的待办事项
 * @param todoData 待办事项数据
 * @returns 创建的待办事项
 */
export const createTodo = async (
  todoData: Pick<ITodo, 'name' | 'description' | 'status'>
): Promise<ITodo> => {
  const todo = new Todo(todoData)
  return todo.save()
}

/**
 * 更新待办事项
 * @param id 待办事项 ID
 * @param updateData 更新数据
 * @returns 更新后的待办事项或 null
 */
export const updateTodoById = async (
  id: string,
  updateData: Partial<ITodo>
): Promise<ITodo | null> => {
  return Todo.findByIdAndUpdate({ _id: id }, updateData, { new: true })
}

/**
 * 删除待办事项
 * @param id 待办事项 ID
 * @returns 删除的待办事项或 null
 */
export const deleteTodoById = async (id: string): Promise<ITodo | null> => {
  return Todo.findByIdAndRemove(id)
}
