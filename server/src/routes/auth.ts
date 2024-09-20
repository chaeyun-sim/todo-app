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

    if (!result || !result.success || !result.user) {
      return res
        .status(401)
        .json({ success: false, message: result?.message || '로그인에 실패했습니다.' });
    }

    const { password, ...userWithoutPassword } = result.user;

    res.json({
      success: true,
      message: '로그인에 성공했습니다.',
      user: userWithoutPassword,
    });
  })
);

router.get(
  '/user/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const result = await req.authService.getUser(Number(req.params.id));

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
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { id } = req.body;

    await req.authService.logout(Number(id));

    return res.json({
      success: true,
      message: '로그아웃 되었습니다.',
    });
  })
);

// 회원 탈퇴
router.delete(
  '/withdrawal/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const result = await req.authService.withdrawal(Number(req.params.id));

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

export default router;
