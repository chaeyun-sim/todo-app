import { getDateString, getDates } from '../utils/dateUtils';
import { TodoItem } from '../types/types';

export class TodoService {
  constructor(private conn: any) {}

  async getTodosByTarget(target?: 'yesterday' | 'today' | 'tomorrow'): Promise<TodoItem[]> {
    const rows = await this.conn.query('SELECT * FROM Todo');
    const dates = getDates();
    const targetDate = dates[target || 'today'];

    return rows.filter((row: TodoItem) => {
      const createdAt =
        typeof row.created_at === 'string' ? row.created_at : getDateString(row.created_at as Date);
      return createdAt.startsWith(targetDate);
    });
  }

  async addTodo({
    title,
    date,
    memo,
    category_id,
  }: {
    title: string;
    date: string;
    memo: string;
    category_id: number;
  }) {
    await this.conn.query('INSERT INTO Todo (title, date, memo, category_id) VALUES (?, ?, ?, ?)', [
      title,
      date,
      memo,
      category_id,
    ]);
  }

  async updateTodo(body: { [key: string]: string }, id: number) {
    const makeSQL = Object.keys(body)
      .map(key => `${key} = ?`)
      .join(', ');

    await this.conn.query(`UPDATE Todo SET ${makeSQL} WHERE id = ?`, [Object.values(body), id]);
  }

  async deleteTodo(id: string) {
    const [rows] = await this.conn.query('SELECT * FROM Todo WHERE id = ?', [id]);

    if (rows.length === 0) {
      return { success: false, message: '일치하는 데이터가 없습니다.' };
    }

    await this.conn.query('DELETE FROM Todo WHERE id = ?', [id]);
    return { success: true };
  }
}
