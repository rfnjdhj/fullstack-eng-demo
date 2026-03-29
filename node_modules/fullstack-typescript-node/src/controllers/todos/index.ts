import { Response, Request } from 'express';
import { ITodo } from './../../types/todo';
import Todo from '../../models/todo';
import {
  getAllDocuments,
  createDocument,
  updateDocumentById,
  deleteDocumentById,
} from '../../utils/dbOperations';

interface TodoUpdateBody {
  name?: string;
  description?: string;
  status?: boolean;
}

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await getAllDocuments(Todo);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching todos',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>;

    if (!body.name || !body.description) {
      res.status(400).json({ message: 'Name and description are required' });
      return;
    }

    const newTodo: ITodo = await createDocument(Todo, {
      name: body.name,
      description: body.description,
      status: body.status || false,
    });

    const allTodos: ITodo[] = await getAllDocuments(Todo);

    res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding todo',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const body = req.body as TodoUpdateBody;

    const updatedTodo: ITodo | null = await updateDocumentById(Todo, id, body);

    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    const allTodos: ITodo[] = await getAllDocuments(Todo);
    res.status(200).json({
      message: 'Todo updated',
      todo: updatedTodo,
      todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating todo',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await deleteDocumentById(Todo, req.params.id as string);

    if (!deletedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    const allTodos: ITodo[] = await getAllDocuments(Todo);
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting todo',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
