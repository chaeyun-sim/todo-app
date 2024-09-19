import { useState } from 'react';
import logo from '../../assets/logo-big.svg';
import Input from '../../components/common/Input';
import style from './index.module.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    Email: '',
    Password: '',
  });
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  });

  const changeHandler = (field: string, value: string) => {
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

  const submitHandler = () => {};

  return (
    <div className={style.container}>
      <img
        src={logo}
        alt='로고'
      />
      <form onSubmit={submitHandler}>
        <div style={{ marginTop: '60px' }}>
          {['Email', 'Password'].map(item => (
            <div key={item}>
              <Input
                value={inputs[item.toLowerCase()]}
                placeholder={item}
                onSetValue={value => changeHandler(item.toLowerCase(), value)}
                required
              />
              <p
                style={{
                  margin: '5px 0 25px',
                  fontSize: '13px',
                  color: errorMessage[item.toLowerCase()] ? 'crimson' : '',
                }}
              >
                {errorMessage[item.toLowerCase()]}
              </p>
            </div>
          ))}
        </div>
        <div className={style.submit_box}>
          <button
            type='submit'
            className={style.submit_btn}
          >
            로그인
          </button>
          <p className={style.more_text}>
            또는{' '}
            <Link
              className={style.do_else}
              to={'/join'}
            >
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
