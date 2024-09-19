import { Request, Response, NextFunction } from 'express';
import getConnection from '../config/connection';
import { TodoService } from '../services/todoService';

const connectionPromise = getConnection();

export const todoServiceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conn = await connectionPromise;
    req.todoService = new TodoService(conn);
    next();
  } catch (error) {
    next(error);
  }
};

declare global {
  namespace Express {
    interface Request {
      todoService: TodoService;
    }
  }
}
