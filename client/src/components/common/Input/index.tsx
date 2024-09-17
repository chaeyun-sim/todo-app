import { InputHTMLAttributes } from 'react';
import style from './index.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onSetValue: (value: string) => void;
}

export default function Input({ value, onSetValue, placeholder, ...rest }: InputProps) {
  return (
    <input
      className={style.input}
      value={value}
      onChange={e => onSetValue(e.target.value)}
      placeholder={placeholder}
      {...rest}
    />
  );
}
