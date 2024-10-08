import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/instance';
import { TodoItem } from '../../types/types';

const token = localStorage.getItem('@token');

const useGetTodos = ({ target, userId }: { target: 'yesterday' | 'today'; userId: number }) => {
  return useQuery({
    queryKey: ['get-todos', target, userId],
    queryFn: async () => {
      if (token) {
        const result = await axiosInstance.get(`/todo?target=${target}&userId=${userId}`);
        const adjustedData = result.data.data.map((todo: TodoItem) => ({
          ...todo,
          start_date: new Date(todo.start_date).toISOString(),
          end_date: new Date(todo.end_date).toISOString(),
        }));
        return adjustedData;
      }
      return [];
    },
    enabled: !!token,
  });
};

const useTodoChecked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axiosInstance.put(`/todo/${id}/check`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
    },
  });
};

const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: {
      user_id: number;
      category_id: number | null;
      title: string;
      start_date: string;
      end_date: string;
      memo: string;
    }) => {
      console.log(props);
      const result = await axiosInstance.post(`/todo/`, props);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
    },
  });
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axiosInstance.delete(`/todo/${id}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
    },
  });
};

const useCountTodos = () => {
  return useQuery({
    queryKey: ['count-todos'],
    queryFn: async () => {
      const result = await axiosInstance.get(`/todo/count`);
      return result.data;
    },
    enabled: !!token,
  });
};

export { useGetTodos, useTodoChecked, useAddTodo, useDeleteTodo, useCountTodos };
