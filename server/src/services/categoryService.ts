import { CategoryItem } from '../types/types';

export class CategoryService {
  constructor(private conn: any) {}

  async addCategory(body: { name: string; color: string }) {
    const data = await this.conn.query('SELECT * FROM Categories');
    let categoryExists = false;

    data.forEach((category: CategoryItem) => {
      if (category.name === data.name) {
        categoryExists = true;
      }
    });

    if (categoryExists) return false;

    await this.conn.query('INSERT INTO Categories (name, color) VALUES (?, ?)', [
      body.name,
      body.color,
    ]);

    return true;
  }

  async getCategories() {
    const data = await this.conn.query('SELECT * FROM Categories');
    return data;
  }

  async deleteCategory(id: string) {
    const data = await this.conn.query('SELECT * FROM Categories');

    if (!data.filter((el: CategoryItem) => el.id === Number(id)).length) return false;

    await this.conn.query('DELETE FROM Categories WHERE id = ?', [Number(id)]);

    return true;
  }
}
