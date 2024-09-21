import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/instance';
import { useMutation } from '@tanstack/react-query';

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axiosInstance.post('/user/logout', { id });
      return result.data;
    },
    onSuccess: () => {
      localStorage.removeItem('@token');
      localStorage.removeItem('@user');
      navigate('/');
    },
    onError: error => {
      console.error('Logout failed:', error);
    },
  });
};

const useWithdrawal = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axiosInstance.delete(`/user/withdrawal/${id}`);
      return result.data;
    },
    onSuccess: () => {
      localStorage.removeItem('@token');
      localStorage.removeItem('@user');
      navigate('/');
    },
  });
};

const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      id,
      origin,
      newPassword,
      newConfirm,
    }: {
      id: number;
      origin: string;
      newPassword: string;
      newConfirm: string;
    }) => {
      const result = await axiosInstance.put(`/user/password/${id}`, {
        origin,
        newPassword,
        newConfirm,
      });
      return result;
    },
  });
};

export { useWithdrawal, useLogout, useChangePassword };
