import express from 'express';
import swaggerUi from 'swagger-ui-express';
import todoRoute from './routes/todos';
import authRoute from './routes/auth';
import categoryRoute from './routes/categories';
import reminderRoute from './routes/reminders';
import userRoute from './routes/user';
import 'reflect-metadata';
import getConnection from './config/connection';
import { specs } from './swagger/swagger';
import { authMiddleware } from './middlewares/authMiddleware';
import mariadb from 'mariadb'; // MariaDB 연결 풀 추가
require('dotenv').config({ path: __dirname + '/./../../.env' });
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(authMiddleware);

app.use('/api/todo', todoRoute);
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/reminder', reminderRoute);
app.use('/api/user', userRoute);

app.get('/health', async (req, res) => {
  try {
    const conn = await mariadb.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'TODO_APP',
    });
    await conn.query('SELECT 1');
    conn.end();

    res.status(200).json({ status: 'OK', message: 'Server and DB are healthy' });
  } catch (err: any) {
    res
      .status(500)
      .json({ status: 'ERROR', message: 'Database connection failed', error: err.message });
  }
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

async function startServer() {
  try {
    await getConnection();
    console.log('MariaDB 연결 성공!');
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error('MariaDB 연결 실패:', err);
  }
}

startServer();
