/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 관련 API
 *
 * paths:
 *   /api/user/{id}:
 *     get:
 *       summary: 사용자 정보 조회
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: 사용자 ID
 *       responses:
 *         200:
 *           description: 성공
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 *
 *   /api/user/logout/{id}:
 *     post:
 *       summary: 로그아웃
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: 사용자 ID
 *       responses:
 *         200:
 *           $ref: '#/components/responses/SuccessResponse'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 *
 *   /api/user/withdrawal/{id}:
 *     delete:
 *       summary: 회원 탈퇴
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: 사용자 ID
 *       responses:
 *         200:
 *           $ref: '#/components/responses/SuccessResponse'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 *
 *   /api/user/change-password/{id}:
 *     put:
 *       summary: 비밀번호 변경
 *       tags: [User]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: 사용자 ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePassword'
 *       responses:
 *         200:
 *           $ref: '#/components/responses/SuccessResponse'
 *         400:
 *           $ref: '#/components/responses/BadRequestError'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/ServerError'
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 사용자 ID
 *         name:
 *           type: string
 *           description: 사용자 이름
 *         email:
 *           type: string
 *           format: email
 *           description: 사용자 이메일
 *         # 기타 필요한 사용자 정보 필드를 추가할 수 있습니다.
 *
 *     ChangePassword:
 *       type: object
 *       required:
 *         - origin
 *         - newPassword
 *         - newConfirm
 *       properties:
 *         origin:
 *           type: string
 *           description: 현재 비밀번호
 *         newPassword:
 *           type: string
 *           description: 새 비밀번호
 *         newConfirm:
 *           type: string
 *           description: 새 비밀번호 확인
 *
 *   responses:
 *     SuccessResponse:
 *       description: 성공
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: 성공적으로 처리되었습니다.
 *     BadRequestError:
 *       description: 잘못된 요청
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: 잘못된 요청입니다.
 *     NotFoundError:
 *       description: 찾을 수 없음
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: 사용자를 찾을 수 없습니다.
 *     ServerError:
 *       description: 서버 오류
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: 서버 오류가 발생했습니다.
 */
