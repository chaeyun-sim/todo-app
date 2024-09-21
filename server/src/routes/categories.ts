import express, { Request, Response } from 'express';
import { Middleware } from '../middlewares/middleware';
import { asyncHandler, errorHandler } from '../middlewares/errorHandler';

const router = express.Router();
router.use(Middleware);
router.use(errorHandler);

// POST "/api/category"
// 카테고리 추가
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.categoryService.addCategory(req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: '이미 존재하는 카테고리입니다.',
      });
    }

    res.status(201).json({
      success: true,
      message: '카테고리 등록 성공!',
    });
  })
);

// GET "/api/category"
// 모든 카테고리 조회
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const data = await req.categoryService.getCategories();

    return res.status(200).json({
      success: true,
      data: data,
    });
  })
);

// GET "/api/category/:id"- 개별 카테고리 조회
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const data = await req.categoryService.getCategory(Number(req.params.id));

    return res.status(200).json({
      success: true,
      data: data || null,
    });
  })
);

// DELETE "/api/category/:id"
// 개별 카테고리 삭제
router.delete(
  '/:name',
  asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = await req.categoryService.deleteCategory(name);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'id와 일치하는 데이터가 존재하지 않습니다.',
      });
    }

    return res.status(200).json({ success: true, message: '카테고리 삭제 성공!' });
  })
);

// GET "/api/category/percentage"
// 카테고리 별 투두
router.get(
  '/stats/todos',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await req.categoryService.getCategoryTodoCounts();
    res.json({
      success: true,
      data: result,
    });
  })
);

export default router;
