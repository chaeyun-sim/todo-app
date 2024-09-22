import express, { Request, Response } from 'express';
import { asyncHandler, errorHandler } from '../middlewares/errorHandler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Middleware } from '../middlewares/middleware';

dotenv.config();

const router = express.Router();
router.use(Middleware);
router.use(errorHandler);

router.post(
  '/join',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.authService.join(req.body);

    if (!result) {
      return res.status(404).json({ success: false, message: '이미 존재하는 유저입니다.' });
    }

    res.json({ success: true, message: `${req.body.name}님, 회원가입 되었습니다.` });
  })
);

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.authService.login(req.body);

    if (!result || !result.success || !result.user) {
      return res
        .status(401)
        .json({ success: false, message: result?.message || '로그인에 실패했습니다.' });
    }

    const { password, ...userWithoutPassword } = result.user;

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      {
        type: 'JWT',
        name: userWithoutPassword.name,
      },
      JWT_SECRET
    );

    res.json({
      success: true,
      message: '로그인에 성공했습니다.',
      token: token,
      user: userWithoutPassword,
    });
  })
);

export default router;
