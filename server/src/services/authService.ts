import { UserItem } from '../types/types';

export class AuthService {
  constructor(private conn: any) {}

  async join(body: { name: string; email: string; password: string }) {
    const data = await this.conn.query('SELECT * FROM User');
    let userExists = false;

    data.forEach((user: UserItem) => {
      if (user.email === body.email) userExists = true;
    });

    if (userExists) return false;

    await this.conn.query('INSERT INTO User (email, name, password) VALUES (?, ?, ?)', [
      body.email,
      body.name,
      body.password,
    ]);

    return true;
  }

  async login(body: {
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string; user?: any }> {
    const query = 'SELECT * FROM User WHERE email = ?';
    const [user] = await this.conn.query(query, [body.email]);

    if (!user || user.password !== body.password) {
      return {
        success: false,
        message: '잘못된 이메일 또는 비밀번호입니다.',
      };
    }

    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: '로그인 성공',
      user: userWithoutPassword,
    };
  }

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
}
