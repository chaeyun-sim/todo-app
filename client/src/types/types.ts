export interface TodoItem {
  id: number;
  category_id?: number;
  title: string;
  start_date: string;
  end_date: string;
  memo?: string;
  is_completed: boolean;
  created_at?: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  color: string;
}
