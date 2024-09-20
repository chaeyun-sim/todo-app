import { ReminderItem } from '../types/types';

export class ReminderService {
  constructor(private conn: any) {}

  async addReminder(body: { todo_id: number; reminder_time: string; message: string }) {
    const data = await this.conn.query('SELECT * FROM Reminders');

    let alreadyExists = false;
    data.forEach((item: ReminderItem) => {
      if (item.todo_id === body.todo_id) {
        alreadyExists = true;
      }
    });

    if (alreadyExists) return false;

    await this.conn.query(
      'INSERT INTO Reminders (todo_id, reminder_time, message) VALUES (?, ?, ?)',
      [body.todo_id, body.reminder_time, body.message]
    );

    return true;
  }

  async getAllReminders() {
    const data = await this.conn.query('SELECT * FROM Reminders');

    return data;
  }
}
