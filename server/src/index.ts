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
require('dotenv').config({ path: __dirname + '/./../../.env' });
import cors from 'cors';
import pool from './config/db';

const app = express();
const port = 3000;

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

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

async function createTables() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS User (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tables created or already exist');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    if (conn) conn.release();
  }
}

async function initializeDatabase(retries = 5) {
  try {
    const conn = await pool.getConnection();
    console.log('Database connected successfully');
    conn.release();
  } catch (err) {
    console.error('Error connecting to database:', err);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
      await initializeDatabase(retries - 1);
    } else {
      console.error('Failed to connect to database after multiple attempts');
      process.exit(1);
    }
  }
}

async function startServer() {
  await initializeDatabase();
  await createTables();
}

startServer();
