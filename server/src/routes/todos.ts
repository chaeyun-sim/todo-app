import express, { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/errorHandler';
import { Middleware } from '../middlewares/middleware';

const router = express.Router();
router.use(Middleware);

// GET "/" - 특정 날의 투두 데이터
// target = 'yesterday' | 'today' | 'tomorrow'
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { target } = req.query as { target?: 'yesterday' | 'today' | 'tomorrow' };

    const result = await req.todoService.getTodosByTarget(target);

    res.json({ success: true, data: result });
  })
);

// POST "/" - 개별 데이터 등록
// req.body - title, start_date, end_date, memo, category_id
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.title) return res.status(400).json({ error: '"title" is required.' });

    await req.todoService.addTodo(req.body);

    res.status(201).json({ success: true, message: `${req.body.title} 투두를 등록했습니다.` });
  })
);

// PUT "/:id" - 개별 데이터 수정
// req.body - 수정하고 싶은 프로퍼티
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    if (!Object.keys(req.body).length) {
      return res.status(404).json({ message: '일치하는 데이터가 없습니다.' });
    }

    await req.todoService.updateTodo(req.body, Number(req.params.id));

    res.json({ success: true, message: `${req.params.id}번 투두를 수정했습니다.` });
  })
);

// PUT "/:id/check" - 투두 완료 여부
router.put(
  '/:id/check',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.todoService.checkTodo(Number(req.params.id));

    if (!result) {
      return res.status(404).json({
        success: false,
        message: '일치하는 데이터가 없습니다.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `${req.params.id}의 완료 여부를 수정했습니다.`,
    });
  })
);

// DELETE "/:id" - 개발 데이터 삭제
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.todoService.deleteTodo(req.params.id);

    if (!result.success) return res.status(404).json({ message: result.message });

    res.json({ success: true, message: `${req.params.id}번 투두를 삭제했습니다.` });
  })
);

router.get(
  '/count',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.todoService.getCompletedTodos();
    res.json({
      success: true,
      count: result.length,
    });
  })
);

export default router;
