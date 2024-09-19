import express from 'express';
import swaggerUi from 'swagger-ui-express';
import todoRoute from './routes/todos';
import userRoute from './routes/user';
import 'reflect-metadata';
import getConnection from './config/connection';
import { specs } from './swagger/swagger';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/todo', todoRoute);
app.use('/api/user', userRoute);

async function testConnection() {
  try {
    await getConnection();
    console.log('MariaDB 연결 성공!');
  } catch (err) {
    console.error('MariaDB 연결 실패:', err);
  }
}

testConnection();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
