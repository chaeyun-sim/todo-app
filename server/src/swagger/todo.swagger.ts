/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: 투두 API
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
 *                 properties:
 *                   id:
 *                     type: int
 *                     example: 3
 *                     description: 인덱스
 *                   user_id:
 *                     type: int
 *                     example: 3
 *                     description: 사용자 인덱스
 *                   category_id:
 *                     type: int
 *                     example: 3
 *                     description: 아이디 인덱스
 *                   title:
 *                     type: string
 *                     example: 제목입니다
 *                     description: 제목
 *                   date:
 *                     type: string
 *                     example: 2024-09-19 22:00:00
 *                     description: 날짜
 *                   memo:
 *                     type: string
 *                     example: 메모입니다
 *                     description: 메모
 *                   created_at:
 *                     type: string
 *                     example: 2024-09-19 22:00:00
 *                     description: 생성 일자
 *                   updated_at:
 *                     type: string
 *                     example: 2024-09-19 22:00:00
 *                     description: 수정 일자
 *                   is_completed:
 *                     type: boolean
 *                     example: false
 *                     description: 투두 완료 여부
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
 *   post:
 *     summary: 투두 추가하기
 *     tags: [Todo]
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
 *                   example: 투두를 추가하였습니다.
 *                   description: 성공 메세지
 *       404:
 *         description: 잘못된 데이터를 입력했습니다.
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
 * /api/todo/:id:
 *   put:
 *     summary: 투두 수정하기
 *     tags: [Todo]
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
 *         description: 잘못된 데이터를 입력했습니다.
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
 *   delete:
 *     summary: 투두 삭제하기
 *     tags: [Todo]
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
 *                   example: 투두를 삭제하였습니다.
 *                   description: 성공 메세지
 *       404:
 *         description: 잘못된 데이터를 입력했습니다.
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
 */
