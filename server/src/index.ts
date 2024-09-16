import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger-output.json';
import routes from './routes/index';
import pool from './config/db';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api', routes);

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SHOW TABLES');
    console.log(rows);
    console.log('MariaDB 연결 성공!');
  } catch (err) {
    console.error('MariaDB 연결 실패:', err);
  } finally {
    if (conn) conn.end();
  }
}

testConnection();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
