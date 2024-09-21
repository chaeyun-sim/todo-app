import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../../api/instance';

const token = localStorage.getItem('@token');

const useSingleCategory = (id: number) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      if (id > 0 && token) {
        const result = await axiosInstance.get(`/category/${id}`);
        return result.data;
      }
      return [];
    },
  });
};

const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await axios.get(`/category`);
      return result.data;
    },
    enabled: !!token,
  });
};

const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      const result = await axiosInstance.post('/category', {
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
      const result = await axiosInstance.delete(`/category/${name}`);
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
      const result = await axiosInstance.get(`/category/stats/todos`);
      return result.data;
    },
    enabled: !!token,
  });
};

export {
  useSingleCategory,
  useCategories,
  useAddCategory,
  useDeleteCategory,
  useGetTodoCountByCategory,
};
