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

  async getCategory(id: number) {
    const data = await this.conn.query('SELECT * FROM Categories WHERE id = ?', [id]);
    return data;
  }

  async deleteCategory(name: string) {
    const data = await this.conn.query('SELECT * FROM Categories');

    if (!data.filter((el: CategoryItem) => el.name === name).length) return false;

    await this.conn.query('DELETE FROM Categories WHERE name = ?', [name]);

    return true;
  }

  async getCategoryTodoCounts() {
    const query = `
    SELECT 
      c.id AS category_id, 
      c.name AS category_name,
      c.color AS category_color,
      COUNT(t.id) AS count
    FROM 
      Categories c
    LEFT JOIN 
      Todo t ON c.id = t.category_id
    GROUP BY 
      c.id, c.name, c.color
  `;

    const result = await this.conn.query(query);
    return result.map((row: any) => ({
      id: Number(row.category_id),
      name: row.category_name,
      color: row.category_color,
      count: Number(row.count),
    }));
  }
}
