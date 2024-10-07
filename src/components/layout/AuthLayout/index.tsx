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
      <img
        src={logo}
        alt='로고'
      />
      <form onSubmit={submitHandler}>
        <Outlet context={{ setSubmitHandler }} />
        <div className={style.submit_box}>
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
            >
              {isLogin ? '회원가입하기' : '로그인하기'}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
