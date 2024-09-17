import { useState, FormEvent, useEffect } from 'react';
import Input from '../Input';
import style from './index.module.css';
import { Link } from 'react-router-dom';

interface InputItem {
  id: number;
  value: string;
}

interface FormProps {
  onSubmit: (inputs: InputItem[]) => void;
  placeholders: string[];
  type: 'login' | 'signup';
}

export default function Form({ onSubmit, placeholders, type }: FormProps) {
  const [inputs, setInputs] = useState<InputItem[]>([]);

  useEffect(() => {
    const newInputs = placeholders.map((_, index) => ({
      id: index + 1,
      value: '',
    }));
    setInputs(newInputs);
  }, [placeholders]);

  const handleInputChange = (id: number, value: string) => {
    setInputs(inputs.map(input => (input.id === id ? { ...input, value } : input)));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={submitHandler}>
      {inputs.map((input, i) => (
        <div
          key={input.id}
          className={i ? style.input : ''}
        >
          <Input
            value={input.value}
            onSetValue={value => handleInputChange(input.id, value)}
            placeholder={placeholders[i]}
          />
        </div>
      ))}
      <div>
        <button
          type='submit'
          className={style.submit_btn}
        >
          {type === 'login' ? '로그인' : '회원가입'}
        </button>
        <p className={style.more_text}>
          또는{' '}
          <Link
            className={style.do_else}
            to={type === 'login' ? '/sign-up' : '/login'}
          >
            {type === 'login' ? '회원가입하기' : '로그인하기'}
          </Link>
        </p>
      </div>
    </form>
  );
}
