/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: 카테고리 관련 API
 *
 * /api/category:
 *   post:
 *     summary: 카테고리 추가
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 일상
 *                 description: 카테고리 이름
 *               color:
 *                 type: string
 *                 example: #fcfcfc
 *                 description: 카테고리 색상 (hex)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 카테고리를 등록했습니다.
 *                   description: 성공 메시지
 *       404:
 *         description: 존재하지 않는 데이터입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 존재하지 않는 데이터입니다.
 *                   description: 에러 메세지
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 *                   description: 에러 메세지
 *
 * /api/category:
 *   get:
 *     summary: 전체 카테고리 조회
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: 카테고리 ID
 *                     name:
 *                       type: string
 *                       example: 일상
 *                       description: 카테고리 이름
 *                     color:
 *                       type: string
 *                       example: #d3d3d3
 *                       description: 카테고리 색상
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 *                   description: 에러 메세지
 *
 * /api/category/:id:
 *   delete:
 *     summary: 카테고리 삭제
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 카테고리가 삭제되었습니다.
 *                   description: 성공 메세지
 *       404:
 *         description: 일치하는 데이터가 없습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 일치하는 데이터가 없습니다.
 *                   description: 에러 메세지
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 *                   description: 에러 메세지
 *
 * /api/category/percentage:
 *   get:
 *     summary: 카테고리 별 투두 수
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: 카테고리 ID
 *                     name:
 *                       type: string
 *                       example: 일상
 *                       description: 카테고리 이름
 *                     todoCount:
 *                       type: number
 *                       example: 0
 *                       description: 카테고리 별 투두 수
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 서버 오류가 발생했습니다.
 *                   description: 에러 메세지
 */
