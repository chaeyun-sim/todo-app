import { UserItem } from '../types/types';

export class UserService {
  constructor(private conn: any) {}

  async getUser(id: number) {
    const result = await this.conn.query('SELECT * FROM User WHERE id = ?', [id]);
    return result;
  }

  async logout(id: number) {
    const rows = await this.conn.query('SELECT * FROM User');

    if (rows.filter((item: UserItem) => item.id === id).length > 0) {
      return true;
    }
    return false;
  }

  async withdrawal(id: number) {
    const rows = await this.conn.query('SELECT * FROM User');

    if (rows.filter((item: UserItem) => item.id === id).length > 0) {
      await this.conn.query('DELETE FROM User WHERE id = ?', [id]);
      return true;
    }
    return false;
  }

  async changePassword(
    body: { origin: string; newPassword: string; newConfirm: string },
    id: number
  ) {
    const rows = await this.conn.query('UPDATE User SET password = ? WHERE ID = ?', [
      body.newPassword,
      id,
    ]);

    return rows;
  }
}
