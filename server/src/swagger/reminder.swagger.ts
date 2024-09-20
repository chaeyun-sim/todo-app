/**
 * @swagger
 * tags:
 *   name: Reminder
 *   description: 알림 관련 API
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: 카테고리 ID
 *                     todo_id:
 *                       type: number
 *                       example: 1
 *                       description: 투두 ID
 *                     reminder_time:
 *                       type: string
 *                       example: 2024-09-19 18:00
 *                       description: 알림 시간
 *                     message:
 *                       type: string
 *                       example: Hello World
 *                       description: 알림 메세지
 *                     created_at:
 *                       type: string
 *                       example: 2024-09-19 18:00
 *                       description: 알림 생성 일자
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
 * /api/reminder:
 *   post:
 *     summary: 알림 추가 추가
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
 *                   example: 알림이 등록되었습니다.
 *                   description: 성공 메시지
 *       404:
 *         description: 이미 존재하는 데이터입니다.
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
 *                   example: 이미 존재하는 데이터입니다.
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
 */
