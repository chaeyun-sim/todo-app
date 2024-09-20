/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 로그인 및 회원가입 API
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: 사용자 ID
 *         email:
 *           type: string
 *           example: admin@admin.com
 *           description: 사용자 이메일
 *         name:
 *           type: string
 *           example: admin
 *           description: 사용자 이름
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-09-19T07:34:54.000Z"
 *           description: 계정 생성 일시
 *         completed_todos:
 *           type: integer
 *           example: 0
 *           description: 완료된 할 일 개수
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
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/responses/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 *
 * /api/auth/join:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: admin
 *                 description: 사용자 이름
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ErrorResponse'
 */
