/**
 * @swagger
 * tags:
 *   name: Category
 *   description: 카테고리 관련 API
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                         description: 카테고리 ID
 *                       name:
 *                         type: string
 *                         example: 일상
 *                         description: 카테고리 이름
 *                       color:
 *                         type: string
 *                         example: #d3d3d3
 *                         description: 카테고리 색상
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * 
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
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *

 *
 * /api/category/{id}:
 *   delete:
 *     summary: 카테고리 삭제
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 카테고리 ID
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                         description: 카테고리 ID
 *                       name:
 *                         type: string
 *                         example: 일상
 *                         description: 카테고리 이름
 *                       todoCount:
 *                         type: number
 *                         example: 0
 *                         description: 카테고리 별 투두 수
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * components:
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
 *                 example: 작업이 성공적으로 완료되었습니다.
 *                 description: 성공 메시지
 *     NotFoundError:
 *       description: 존재하지 않는 데이터입니다.
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
 *                 example: 존재하지 않는 데이터입니다.
 *                 description: 에러 메세지
 *     ServerError:
 *       description: 서버 오류가 발생했습니다.
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
 *                 example: 서버 오류가 발생했습니다.
 *                 description: 에러 메세지
 */
