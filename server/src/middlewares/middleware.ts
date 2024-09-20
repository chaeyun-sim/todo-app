import { Request, Response, NextFunction } from 'express';
import getConnection from '../config/connection';
import { TodoService } from '../services/todoService';
import { AuthService } from '../services/authService';
import { CategoryService } from '../services/categoryService';
import { ReminderService } from '../services/reminderService';

const connectionPromise = getConnection();

export const Middleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const conn = await connectionPromise;
    req.todoService = new TodoService(conn);
    req.authService = new AuthService(conn);
    req.categoryService = new CategoryService(conn);
    req.reminderService = new ReminderService(conn);
    req.middlewareProcessed = true;
    next();
  } catch (error) {
    next(error);
  }
};

declare global {
  namespace Express {
    interface Request {
      todoService: TodoService;
      authService: AuthService;
      categoryService: CategoryService;
      reminderService: ReminderService;
      middlewareProcessed: boolean;
    }
  }
}
