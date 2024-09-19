import express from 'express';
import { Middleware } from '../middlewares/middleware';
import { asyncHandler, errorHandler } from '../middlewares/errorHandler';

const router = express.Router();
router.use(Middleware);
router.use(errorHandler);

router.post(
  '/join',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const result = await req.authService.join(req.body);

    if (!result) {
      return res.status(404).json({ success: false, message: '이미 존재하는 유저입니다.' });
    }

    res.json({ success: true, message: `${req.body.name}님, 회원가입 되었습니다.` });
  })
);

router.post(
  '/login',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const result = await req.authService.login(req.body);

    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }

    const { password, ...userWithoutPassword } = result.user;

    res.json({
      success: true,
      message: '로그인에 성공했습니다.',
      user: userWithoutPassword,
    });
  })
);

export default router;
