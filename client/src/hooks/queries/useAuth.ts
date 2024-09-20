import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useJoin = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const result = await axios.post('/api/auth/join', {
        name,
        email,
        password,
      });
      return result.data;
    },
  });
};

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        const result = await axios.post('/api/auth/login', {
          email,
          password,
        });
        return result.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
        }
        throw error;
      }
    },
    onSuccess: data => {
      localStorage.setItem('@isLoggedIn', 'true');
      localStorage.setItem('@user_id', data.user.id);
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('로그인 에러:', error.message);
    },
  });
};

const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const result = await axios.get(`/api/auth/user/${id}`);
      return result.data;
    },
  });
};

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axios.post('/api/auth/logout', { id });
      return result.data;
    },
    onSuccess: () => {
      localStorage.setItem('@isLoggedIn', 'false');
      localStorage.removeItem('@user_id');
      navigate('/');
    },
  });
};

const useWithdrawal = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const result = await axios.delete(`/api/auth/withdrawal/${id}`);
      return result.data;
    },
    onSuccess: () => {
      localStorage.setItem('@isLoggedIn', 'false');
      localStorage.removeItem('@user_id');
      navigate('/');
    },
  });
};

export { useJoin, useLogin, useGetUser, useLogout, useWithdrawal };
