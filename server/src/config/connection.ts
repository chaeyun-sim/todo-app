import pool from './db';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

async function getConnection(retries = 0): Promise<any> {
  try {
    const conn = await pool.getConnection();
    console.log('Database connected successfully');
    return conn;
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    if (retries < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return getConnection(retries + 1);
    } else {
      throw new Error('Max retries reached. Could not connect to the database.');
    }
  }
}

export default getConnection;
