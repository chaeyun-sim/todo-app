import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../api/instance';

const token = localStorage.getItem('@token');

const useGetTodos = ({
  target,
  userId,
}: {
  target: 'yesterday' | 'today' | 'tomorrow';
  userId: number;
}) => {
  return useQuery({
    queryKey: ['get-todos', target, userId],
    queryFn: async () => {
      if (token) {
        const result = await axiosInstance.get(`/todo?target=${target}&userId=${userId}`);
        return result.data;
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
    mutationFn: async ({
      user_id,
      category_id,
      title,
      start_date,
      end_date,
      memo,
    }: {
      user_id: number;
      category_id: number;
      title: string;
      start_date: string;
      end_date: string;
      memo: string;
    }) => {
      const result = await axiosInstance.post(`/todo/`, {
        user_id,
        category_id,
        title,
        start_date,
        end_date,
        memo,
      });
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
