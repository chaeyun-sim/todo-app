import { useEffect, useState } from 'react';
import { useJoin } from '../../hooks/queries/useAuth';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../components/layout/AuthLayout';

interface JoinFormData extends Record<string, string> {
  name: string;
  email: string;
  password: string;
}

export default function Join() {
  const [inputs, setInputs] = useState<JoinFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<JoinFormData>({
    name: '',
    email: '',
    password: '',
  });

  const { mutate } = useJoin();
  const { setSubmitHandler } = useAuth();

  useEffect(() => {
    setSubmitHandler((e: React.FormEvent) => {
      e.preventDefault();
      if (!inputs.name || !inputs.email || !inputs.password) return;

      mutate({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
    });
  }, [inputs, mutate, setSubmitHandler]);

  const changeHandler = (field: keyof JoinFormData, value: string) => {
    let isValid = true;
    let errorMsg = '';

    if (field === 'name') {
      isValid = /^[a-zA-Zㄱ-ㅎ가-힣]*$/.test(value);
      errorMsg = isValid ? '' : '영문, 한글 외의 문자는 입력할 수 없습니다.';
    } else if (field === 'email') {
      const filteredValue = value.replace(/[^a-zA-Z0-9._%+-@]/g, '');
      isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(filteredValue);
      errorMsg = isValid ? '' : '올바른 이메일 형식이 아닙니다.';
      value = filteredValue;
    }

    setInputs({ ...inputs, [field]: value });
    setErrorMessage({ ...errorMessage, [field]: errorMsg });
  };

  return (
    <AuthForm<JoinFormData>
      inputs={inputs}
      errorMessage={errorMessage}
      validFunc={changeHandler}
    />
  );
}
