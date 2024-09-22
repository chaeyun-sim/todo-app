import { Request, Response, NextFunction } from 'express';
import getConnection from '../config/connection';
import { TodoService } from '../services/todoService';
import { AuthService } from '../services/authService';
import { CategoryService } from '../services/categoryService';
import { ReminderService } from '../services/reminderService';
import { UserService } from '../services/userService';

export const Middleware = async (req: Request, _res: Response, next: NextFunction) => {
  const conn = await getConnection();

  try {
    req.todoService = new TodoService(conn);
    req.authService = new AuthService(conn);
    req.categoryService = new CategoryService(conn);
    req.reminderService = new ReminderService(conn);
    req.userService = new UserService(conn);
    req.middlewareProcessed = true;
    next();
  } catch (error) {
    next(error);
  } finally {
    if (conn) conn.release();
  }
};

declare global {
  namespace Express {
    interface Request {
      todoService: TodoService;
      authService: AuthService;
      categoryService: CategoryService;
      reminderService: ReminderService;
      userService: UserService;
      middlewareProcessed: boolean;
    }
  }
}
