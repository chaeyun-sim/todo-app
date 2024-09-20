export type TodoItem = {
  id: number;
  user_id: number | null;
  category_id: number | null;
  title: string;
  date: string;
  memo: string;
  created_at: string;
  updated_at: string;
  is_completed: string;
};

export type UserItem = {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: string;
  completed_todos: string;
};
