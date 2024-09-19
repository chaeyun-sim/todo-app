import { Request, Response, NextFunction } from 'express';

export const errorHandler = (res: Response, err: any) => {
  console.error(err);
  res.status(500).send({
    success: false,
    message: '서버 오류가 발생했습니다.',
  });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(err => errorHandler(res, err));
};
