import { PropsWithChildren } from 'react';
import style from './index.module.css';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className={style.main}>
      <div className={style.contents}>
        <header className={style.header}>hi</header>
        <div className={style.children}>{children}</div>
        <footer className={style.footer}>bye</footer>
      </div>
    </main>
  );
}
