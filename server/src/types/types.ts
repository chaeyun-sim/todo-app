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
