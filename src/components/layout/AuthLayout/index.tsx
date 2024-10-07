import { Link, Outlet, useOutletContext } from 'react-router-dom';
import logo from '../../../assets/logo-big.svg';
import style from './index.module.css';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useJoin, useLogin } from '../../../hooks/queries/useAuth';
import { AxiosError } from 'axios';

type ContextType = {
  submitFunc: (value: { [key: string]: string }) => void;
};

export function useAuth() {
  return useOutletContext<ContextType>();
}

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [submitFunc, setSubmitFunc] = useState<{ [key: string]: string }>(() => ({}));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const { mutate: loginFunc } = useLogin({
    errorHandler: (error: AxiosError) => {
      if (error.response?.status === 401) {
        setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setErrorMsg('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
    successHandler: () => setErrorMsg(''),
  });

  const { mutate: joinFunc } = useJoin({
    errorHandler: (error: AxiosError) => {
      if (error.response?.status === 409) {
        setErrorMsg('이미 사용 중인 이메일입니다.');
      } else {
        setErrorMsg('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
    successHandler: () => setErrorMsg(''),
  });

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!submitFunc) return;

      const formData = submitFunc;

      if (location.pathname === '/login' && 'email' in formData && 'password' in formData) {
        loginFunc({ email: formData.email as string, password: formData.password as string });
      } else if (
        location.pathname === '/join' &&
        'email' in formData &&
        'password' in formData &&
        'name' in formData
      ) {
        joinFunc({
          email: formData.email as string,
          password: formData.password as string,
          name: formData.name as string,
        });
      }
    },
    [submitFunc, location.pathname, loginFunc, joinFunc]
  );

  return (
    <div className={style.container}>
      <div>
        <img
          src={logo}
          alt='투두 앱 로고 이미지'
          style={{ width: '100%' }}
        />
      </div>
      <form
        onSubmit={submitHandler}
        aria-label={isLogin ? '로그인 양식' : '회원가입 양식'}
      >
        <Outlet context={{ submitFunc: setSubmitFunc }} />
        {errorMsg && <p style={{ color: 'crimson', marginBottom: '10px' }}>{errorMsg}</p>}
        <div
          className={style.submit_box}
          aria-label='회원가입 또는 로그인 버튼 그룹'
        >
          <button
            type='submit'
            className={style.submit_btn}
          >
            {isLogin ? '로그인' : '회원가입'}
          </button>
          <p className={style.more_text}>
            또는{' '}
            <Link
              className={style.do_else}
              to={isLogin ? '/join' : '/login'}
              onClick={() => setIsLogin(!isLogin)}
              role='link'
            >
              {isLogin ? '회원가입하기' : '로그인하기'}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
