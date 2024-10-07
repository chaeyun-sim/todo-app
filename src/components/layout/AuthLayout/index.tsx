import { Link, Outlet, useOutletContext } from 'react-router-dom';
import logo from '../../../assets/logo-big.svg';
import style from './index.module.css';
import { useState } from 'react';

type ContextType = {
  setSubmitHandler: (handler: (e: React.FormEvent) => void) => void;
};

export function useAuth() {
  return useOutletContext<ContextType>();
}

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [submitHandler, setSubmitHandler] = useState<(e: React.FormEvent) => void>(
    () => (e: React.FormEvent) => {
      e.preventDefault();
    }
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
        <Outlet context={{ setSubmitHandler }} />
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
