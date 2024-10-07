import { useEffect, useState } from 'react';
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

  const { submitFunc } = useAuth();
  useEffect(() => {
    submitFunc({
      email: inputs.email,
      password: inputs.password,
    });
  }, [inputs, submitFunc]);

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
    <AuthForm<LoginFormData>
      inputs={inputs}
      errorMessage={errorMessage}
      validFunc={changeHandler}
    />
  );
}
