import express from 'express';
import { Middleware } from '../middlewares/middleware';
import { asyncHandler } from '../middlewares/errorHandler';

const router = express.Router();
router.use(Middleware);

// POST "/api/reminder"
// 알림 추가
// req.body - todo_id, reminder_time, message

router.post(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const result = await req.reminderService.addReminder(req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: '이미 존재하는 데이터입니다.',
      });
    }

    return res.status(201).json({
      success: true,
      message: '알림이 등록되었습니다.',
    });
  })
);

// GET "/api/reminder"
// 알림 전체 조회

router.get(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const data = await req.reminderService.getAllReminders();

    res.status(200).json({
      success: true,
      data: data,
    });
  })
);

export default router;
