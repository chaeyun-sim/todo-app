import getConnection from './connection';

const createTableTodo = `
  CREATE TABLE IF NOT EXISTS Todo (
    id INT AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    title VARCHAR(50) NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    memo VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
  );
`;

const createTableReminder = `
  CREATE TABLE IF NOT EXISTS Reminders (
    id INT AUTO_INCREMENT,
    todo_id INT,
    reminder_time DATETIME NOT NULL,
    message VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_notified BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (todo_id) REFERENCES Todo(id)
  );
`;

const createTableUser = `
  CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_todos INT DEFAULT 0,
    PRIMARY KEY (id)
  );
`;

const createTableCategories = `
  CREATE TABLE IF NOT EXISTS Categories (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(7),
    PRIMARY KEY (id)
  );
`;

async function createTables() {
  const conn = await getConnection();
  try {
    await conn.query(createTableUser);
    await conn.query(createTableCategories);
    await conn.query(createTableTodo);
    await conn.query(createTableReminder);
    console.log('Tables created successfully (if they did not exist).');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    conn.release();
  }
}

export default createTables;
