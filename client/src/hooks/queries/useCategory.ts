import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useSingleCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const result = await axios.get(`/api/category/${id}`);
      return result.data;
    },
  });
};

const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await axios.get(`/api/category`);
      return result.data;
    },
  });
};

const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      const result = await axios.post('/api/category', {
        name,
        color,
      });
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const result = await axios.delete(`/api/category/${name}`);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

const useGetTodoCountByCategory = () => {
  return useQuery({
    queryKey: ['todo-count-by-category'],
    queryFn: async () => {
      const result = await axios.get(`/api/category/stats/todos`);
      return result.data;
    },
  });
};

export {
  useSingleCategory,
  useCategories,
  useAddCategory,
  useDeleteCategory,
  useGetTodoCountByCategory,
};
