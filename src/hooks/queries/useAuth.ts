import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useJoin = () => {
  const navigate = useNavigate();

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
      const result = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/join`, {
        name,
        email,
        password,
      });
      return result.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
};

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      return result.data;
    },
    onSuccess: data => {
      localStorage.setItem('@token', data.token);
      localStorage.setItem('@user', JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('로그인 에러:', error.message);
    },
  });
};

export { useJoin, useLogin };
