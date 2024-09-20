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

export { useSingleCategory, useCategories, useAddCategory };
