import SSE from 'sse';
import { Connection } from 'mariadb';
import { ReminderItem } from '../types/types';
import { EventEmitter } from 'events';

export class SSEService {
  constructor(private conn: Connection) {}

  setupSSE() {
    const eventEmitter = new EventEmitter();
    const sse = new SSE(eventEmitter);

    sse.on('connection', (client: SSE.Client) => {
      console.log('SSE 클라이언트 연결됨');

      this.setupReminders(client);

      client.on('close', () => {
        console.log('클라이언트 연결이 종료되었습니다.');
      });
    });
  }

  private setupReminders(client: SSE.Client) {
    const setReminder = (reminder: { time: string; message: string; todoId: number }) => {
      const currentTime = new Date();
      const reminderTime = new Date(reminder.time);
      const timeDifference = reminderTime.getTime() - currentTime.getTime();

      if (timeDifference > 0) {
        setTimeout(() => {
          client.send(`${reminder.message}`);
          this.conn
            .query('UPDATE Reminder SET isNotified = true WHERE todo_id = ?', [reminder.todoId])
            .catch(err => console.error(err));
        }, timeDifference);
      }
    };

    this.conn
      .query('SELECT * FROM Reminder WHERE isNotified = false')
      .then(results => {
        results.forEach((reminder: ReminderItem) =>
          setReminder({
            time: reminder.reminder_time,
            message: reminder.message,
            todoId: reminder.todo_id,
          })
        );
      })
      .catch(err => console.error(err));
  }
}
