import pool from './db';

async function getConnection() {
  const conn = await pool.getConnection();
  return conn;
}

export default getConnection;
