import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'TODO_APP',
  connectionLimit: 5,
  timezone: '+09:00',
});

export default pool;
