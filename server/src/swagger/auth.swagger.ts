/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: 인증 관련 API
 *
 * paths:
 *   /auth/join:
 *     post:
 *       summary: 회원가입
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *               properties:
 *                 name:
 *                   type: string
 *                   example: 홍길동
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: hong@example.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: password123
 *       responses:
 *         200:
 *           description: 회원가입 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: 홍길동님, 회원가입 되었습니다.
 *         404:
 *           description: 이미 존재하는 사용자
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 이미 존재하는 유저입니다.
 *
 *   /auth/login:
 *     post:
 *       summary: 로그인
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: hong@example.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: password123
 *       responses:
 *         200:
 *           description: 로그인 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: 로그인에 성공했습니다.
 *                   token:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: 홍길동
 *                       email:
 *                         type: string
 *                         example: hong@example.com
 *         401:
 *           description: 로그인 실패
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: 로그인에 실패했습니다.
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: 홍길동
 *         email:
 *           type: string
 *           format: email
 *           example: hong@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 */
