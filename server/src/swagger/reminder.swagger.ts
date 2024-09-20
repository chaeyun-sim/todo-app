/**
 * @swagger
 * tags:
 *   name: Reminder
 *   description: 알림 관련 API
 *
 * components:
 *   schemas:
 *     Reminder:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: 알림 ID
 *         todo_id:
 *           type: number
 *           example: 1
 *           description: 투두 ID
 *         reminder_time:
 *           type: string
 *           example: 2024-09-19 18:00
 *           description: 알림 시간
 *         message:
 *           type: string
 *           example: Hello World
 *           description: 알림 메세지
 *         created_at:
 *           type: string
 *           example: 2024-09-19 18:00
 *           description: 알림 생성 일자
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
 * /api/reminder:
 *   get:
 *     summary: 전체 알림 조회
 *     tags: [Reminder]
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reminder'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *
 *   post:
 *     summary: 알림 추가
 *     tags: [Reminder]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todo_id:
 *                 type: number
 *                 example: 1
 *                 description: 투두 ID
 *               reminder_time:
 *                 type: string
 *                 example: 2024-09-19 18:00
 *                 description: 알림 시간
 *               message:
 *                 type: string
 *                 example: Hello World
 *                 description: 알림 메세지
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
