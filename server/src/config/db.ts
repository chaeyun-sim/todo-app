import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'TODO_APP',
  connectionLimit: 5,
  timezone: '+09:00',
});

export default pool;
