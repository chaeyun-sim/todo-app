import { UserItem } from '../types/types';

export class UserService {
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
}
