/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: 할 일 관련 API
 *
 * /api/todo:
 *   get:
 *     summary: 특정 날짜의 할 일 목록 조회
 *     tags: [Todo]
 *     parameters:
 *       - in: query
 *         name: target
 *         schema:
 *           type: string
 *           enum: [yesterday, today, tomorrow]
 *         description: 조회할 날짜 (기본값 - today)
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoItem'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 *   post:
 *     summary: 새로운 할 일 추가
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTodo'
 *     responses:
 *       '201':
 *         $ref: '#/components/responses/SuccessResponse'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/todo/{id}:
 *   put:
 *     summary: 할 일 수정
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할 일 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodo'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/SuccessResponse'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 *   delete:
 *     summary: 할 일 삭제
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 할 일 ID
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/SuccessResponse'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/todo/{id}/check:
 *   put:
 *     summary: 할 일 완료 상태 토글
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 할 일 ID
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/SuccessResponse'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 * /api/todo/completed:
 *   get:
 *     summary: 완료된 할 일 목록 조회
 *     tags: [Todo]
 *     responses:
 *       '200':
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoItem'
 *       '500':
 *         $ref: '#/components/responses/ServerError'
 *
 * components:
 *   schemas:
 *     TodoItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 할 일 ID
 *         title:
 *           type: string
 *           description: 할 일 제목
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: 시작 날짜
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: 종료 날짜
 *         memo:
 *           type: string
 *           description: 메모
 *         category_id:
 *           type: integer
 *           nullable: true
 *           description: 카테고리 ID
 *         is_completed:
 *           type: boolean
 *           description: 완료 여부
 *
 *     NewTodo:
 *       type: object
 *       required:
 *         - title
 *         - start_date
 *         - end_date
 *         - memo
 *       properties:
 *         title:
 *           type: string
 *           description: 할 일 제목
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: 시작 날짜
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: 종료 날짜
 *         memo:
 *           type: string
 *           description: 메모
 *         category_id:
 *           type: integer
 *           nullable: true
 *           description: 카테고리 ID
 *
 *     UpdateTodo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: 할 일 제목
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: 시작 날짜
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: 종료 날짜
 *         memo:
 *           type: string
 *           description: 메모
 *         category_id:
 *           type: integer
 *           nullable: true
 *           description: 카테고리 ID
 *         is_completed:
 *           type: boolean
 *           description: 완료 여부
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
 *                 example: 일치하는 데이터가 없습니다.
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
