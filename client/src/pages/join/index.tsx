import { useState } from 'react';
import Input from '../../components/common/Input';
import style from './index.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-big.svg';
import { useJoin } from '../../hooks/queries/useAuth';

export default function Join() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    password: '',
  });

  const { mutate } = useJoin();

  const changeHandler = (field: string, value: string) => {
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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputs.name && inputs.email && inputs.password.length > 8) {
      mutate({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      // TODO: Toast Success 만들기
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };

  return (
    <div className={style.container}>
      <img
        src={logo}
        alt='로고'
      />
      <form onSubmit={submitHandler}>
        <div style={{ marginTop: '60px' }}>
          {['Name', 'Email', 'Password'].map(item => (
            <div key={item}>
              <Input
                type={item === 'Name' ? 'text' : item.toLowerCase()}
                placeholder={item}
                value={inputs[item.toLowerCase()]}
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
            회원가입
          </button>
          <p className={style.more_text}>
            또는{' '}
            <Link
              className={style.do_else}
              to={'/login'}
            >
              로그인하기
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
