import express from 'express';
import swaggerUi from 'swagger-ui-express';
import todoRoute from './routes/todos';
import authRoute from './routes/auth';
import categoryRoute from './routes/categories';
import reminderRoute from './routes/reminders';
import 'reflect-metadata';
import getConnection from './config/connection';
import { specs } from './swagger/swagger';
import { SSEService } from './services/sseService';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/todo', todoRoute);
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/reminder', reminderRoute);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

async function startServer() {
  try {
    const conn = await getConnection();
    console.log('MariaDB 연결 성공!');

    const sseService = new SSEService(conn);

    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
      sseService.setupSSE();
    });
  } catch (err) {
    console.error('MariaDB 연결 실패:', err);
  }
}

startServer();
