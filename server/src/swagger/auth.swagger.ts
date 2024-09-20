/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 로그인 및 회원가입 API
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: 성공 여부
 *                 message:
 *                   type: string
 *                   example: 로그인에 성공했습니다.
 *                   description: 성공 메시지
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: 사용자 ID
 *                     email:
 *                       type: string
 *                       example: admin@admin.com
 *                       description: 사용자 이메일
 *                     name:
 *                       type: string
 *                       example: admin
 *                       description: 사용자 이름
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-19T07:34:54.000Z"
 *                       description: 계정 생성 일시
 *                     completed_todos:
 *                       type: integer
 *                       example: 0
 *                       description: 완료된 할 일 개수
 *       404:
 *         description: 존재하지 않는 유저입니다.
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
 *                   example: 투두를 수정하였습니다.
 *                   description: 성공 메세지
 *       404:
 *         description: 이미 존재하는 유저입니다.
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
 *                   example: 이미 존재하는 유저입니다.
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
