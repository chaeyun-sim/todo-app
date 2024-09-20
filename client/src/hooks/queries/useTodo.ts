import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useGetTodos = ({ target }: { target: 'yesterday' | 'today' | 'tomorrow' }) => {
  return useQuery({
    queryKey: ['get-todos', target],
    queryFn: async () => {
      const result = await axios.get(`/api/todo?target=${target}`);
      return result.data;
    },
  });
};

const useTodoChecked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axios.put(`/api/todo/${id}/check`);
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
      category_id,
      title,
      start_date,
      end_date,
      memo,
    }: {
      category_id: number;
      title: string;
      start_date: string;
      end_date: string;
      memo: string;
    }) => {
      const result = await axios.post(`/api/todo/`, {
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
      const result = await axios.delete(`/api/todo/${id}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
    },
  });
};

const useCountTodos = (userId: number) => {
  return useQuery({
    queryKey: ['count-todos', userId],
    queryFn: async () => {
      const result = await axios.get(`/api/todo/count/${userId}`);
      return result.data;
    },
  });
};

export { useGetTodos, useTodoChecked, useAddTodo, useDeleteTodo, useCountTodos };
