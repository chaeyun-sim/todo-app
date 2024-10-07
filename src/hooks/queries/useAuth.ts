import { QueryClient, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const useJoin = ({
  errorHandler,
  successHandler,
}: {
  errorHandler: (error: AxiosError) => void;
  successHandler: () => void;
}) => {
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
      successHandler();
      navigate('/login');
    },
    onError: errorHandler,
  });
};

const useLogin = ({
  errorHandler,
  successHandler,
}: {
  errorHandler: (error: AxiosError) => void;
  successHandler: () => void;
}) => {
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
      successHandler();
      localStorage.setItem('@token', data.token);
      localStorage.setItem('@user', JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['get-todos'] });
      navigate('/');
    },
    onError: errorHandler,
  });
};

export { useJoin, useLogin };
