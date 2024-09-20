import express from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import { Middleware } from '../middlewares/middleware';

const router = express.Router();
router.use(Middleware);

// GET "/" - 특정 날의 투두 데이터
// target = 'yesterday' | 'today' | 'tomorrow'
router.get(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { target } = req.query as { target?: 'yesterday' | 'today' | 'tomorrow' };

    const result = await req.todoService.getTodosByTarget(target);

    res.json({ success: true, data: result });
  })
);

// POST "/" - 개별 데이터 등록
// req.body - title, date, memo
router.post(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    if (!req.body.title) return res.status(400).json({ error: '"title" is required.' });

    await req.todoService.addTodo(req.body);

    res.status(201).json({ success: true, message: `${req.body.title} 투두를 등록했습니다.` });
  })
);

// PUT "/:id" - 개별 데이터 수정
// req.body - 수정하고 싶은 프로퍼티
router.put(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    if (!Object.keys(req.body).length) {
      return res.status(404).json({ message: '일치하는 데이터가 없습니다.' });
    }

    await req.todoService.updateTodo(req.body, Number(req.params.id));

    res.json({ success: true, message: `${req.params.id}번 투두를 수정했습니다.` });
  })
);

// DELETE "/:id" - 개발 데이터 삭제
router.delete(
  '/:id',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const result = await req.todoService.deleteTodo(req.params.id);

    if (!result.success) return res.status(404).json({ message: result.message });

    res.json({ success: true, message: `${req.params.id}번 투두를 삭제했습니다.` });
  })
);

export default router;
