/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: 투두 API
 *
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *           description: 투두 ID
 *         user_id:
 *           type: integer
 *           example: 3
 *           description: 유저 ID
 *         category_id:
 *           type: integer
 *           example: 3
 *           description: 카테고리 ID
 *         title:
 *           type: string
 *           example: 제목입니다
 *           description: 제목
 *         date:
 *           type: string
 *           example: 2024-09-19 22:00:00
 *           description: 날짜
 *         memo:
 *           type: string
 *           example: 메모입니다
 *           description: 메모
 *         created_at:
 *           type: string
 *           example: 2024-09-19 22:00:00
 *           description: 생성 일자
 *         updated_at:
 *           type: string
 *           example: 2024-09-19 22:00:00
 *           description: 수정 일자
 *         is_completed:
 *           type: boolean
 *           example: false
 *           description: 투두 완료 여부
 *
 *   responses:
 *     SuccessResponse:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *                 description: 성공 여부
 *               message:
 *                 type: string
 *                 description: 성공 메시지
 *
 *     ErrorResponse:
 *       description: 에러 응답
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *                 description: 성공 여부
 *               message:
 *                 type: string
 *                 description: 에러 메세지
 *
 * /api/todo:
 *   get:
 *     summary: 날짜에 맞는 투두 전체 가져오기
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *
 *   post:
 *     summary: 투두 추가하기
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *
 * /api/todo/{id}/check:
 *   put:
 *     summary: 투두 완료 여부 수정하기
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 투두 ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *
 * /api/todo/{id}:
 *   put:
 *     summary: 투두 수정하기
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 투두 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *
 *   delete:
 *     summary: 투두 삭제하기
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 투두 ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
