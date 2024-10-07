import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/queries/useAuth';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../components/layout/AuthLayout';

interface LoginFormData extends Record<string, string> {
  email: string;
  password: string;
}

export default function Login() {
  const [inputs, setInputs] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const { mutate, error } = useLogin();
  const { setSubmitHandler } = useAuth();

  useEffect(() => {
    setSubmitHandler((e: React.FormEvent) => {
      e.preventDefault();
      if (!inputs.email || !inputs.password) return;

      mutate({
        email: inputs.email,
        password: inputs.password,
      });
    });
  }, [inputs, mutate, setSubmitHandler]);

  const changeHandler = (field: keyof LoginFormData, value: string) => {
    let isValid = true;
    let errorMsg = '';

    if (field === 'email') {
      const filteredValue = value.replace(/[^a-zA-Z0-9._%+-@]/g, '');
      isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(filteredValue);
      errorMsg = isValid ? '' : '올바른 이메일 형식이 아닙니다.';
      value = filteredValue;
    }

    setInputs({ ...inputs, [field]: value });
    setErrorMessage({ ...errorMessage, [field]: errorMsg });
  };

  return (
    <>
      <AuthForm<LoginFormData>
        inputs={inputs}
        errorMessage={errorMessage}
        validFunc={changeHandler}
      />
      {error && (
        <p style={{ color: 'crimson', marginBottom: '10px' }}>
          {error instanceof Error ? error.message : '로그인에 실패했습니다.'}
        </p>
      )}
    </>
  );
}
