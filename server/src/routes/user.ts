import express, { Request, Response } from 'express';
import { Middleware } from '../middlewares/middleware';
import { asyncHandler, errorHandler } from '../middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
router.use(Middleware);
router.use(errorHandler);

router.get(
  '/profile/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.userService.getUser(Number(req.params.id));

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
    }
    res.json({
      success: true,
      user: {
        id: result[0].id,
        name: result[0].name,
        todos: result[0].completed_todos,
      },
    });
  })
);

// 로그아웃
// req.body - id
router.post(
  '/logout/',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;

    await req.userService.logout(Number(id));

    return res.json({
      success: true,
      message: '로그아웃 되었습니다.',
    });
  })
);

// 회원 탈퇴
router.delete(
  '/withdrawal/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.userService.withdrawal(Number(req.params.id));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: '일치하는 데이터가 없습니다.',
      });
    }

    return res.json({
      success: true,
      message: '탈퇴 되었습니다.',
    });
  })
);

// 비밀번호 변경
// req.body - origin, newPassword, newConfirm
router.put(
  '/password/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.userService.changePassword(req.body, Number(req.params.id));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: '일치하는 데이터가 없습니다.',
      });
    }

    return res.json({
      success: true,
      message: '비밀번호가 변경되었습니다!',
    });
  })
);

export default router;
