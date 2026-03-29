import { Response, Request } from 'express'
import { ITodo } from './../../types/todo'
import { getAllTodos, createTodo, updateTodoById, deleteTodoById } from '../../utils/todoUtils'

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await getAllTodos()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>

        const newTodo: ITodo = await createTodo(body)
        const allTodos: ITodo[] = await getAllTodos()

        res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updatedTodo: ITodo | null = await updateTodoById(id, body)
        const allTodos: ITodo[] = await getAllTodos()
        res.status(200).json({
            message: 'Todo updated',
            todo: updatedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await deleteTodoById(req.params.id)
        const allTodos: ITodo[] = await getAllTodos()
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
