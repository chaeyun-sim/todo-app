import { Request, Response, NextFunction } from 'express';
import getConnection from '../config/connection';
import { TodoService } from '../services/todoService';
import { UserService } from '../services/userService';

const connectionPromise = getConnection();

export const Middleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const conn = await connectionPromise;
    req.todoService = new TodoService(conn);
    req.userService = new UserService(conn);
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
      userService: UserService;
      middlewareProcessed: boolean;
    }
  }
}
