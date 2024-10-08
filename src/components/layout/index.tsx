import { lazy, PropsWithChildren, useState } from 'react';
import style from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import NotificationModal from '../common/modal/NotificationModal';

const FiMenu = lazy(() => import('react-icons/fi').then(mod => ({ default: mod.FiMenu })));
const MdNavigateBefore = lazy(() =>
  import('react-icons/md').then(mod => ({ default: mod.MdNavigateBefore }))
);
const IoNotificationsOutline = lazy(() =>
  import('react-icons/io5').then(mod => ({ default: mod.IoNotificationsOutline }))
);

export default function Layout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={style.main}>
      <div className={style.contents}>
        {!['/join', '/login'].includes(pathname) && (
          <header
            className={style.header}
            style={{ justifyContent: pathname === '/my' ? 'flex-start' : 'flex-end' }}
          >
            {pathname === '/my' ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Link
                  to={'/'}
                  role='button'
                  aria-label='투두 페이지로 가기'
                >
                  <MdNavigateBefore size={26} />
                </Link>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <button
                  onClick={() => setIsOpen(true)}
                  aria-label='알림 보기'
                >
                  <IoNotificationsOutline size={24} />
                </button>
                <Link
                  to={'/my'}
                  className={style.link}
                  aria-label='마이페이지로 가기'
                >
                  <FiMenu size={22} />
                </Link>
              </div>
            )}
          </header>
        )}
        <div
          className={style.children}
          style={{
            height: pathname === '/my' ? 'calc(100% - 60px - 60px - 10px)' : 'calc(100% - 60px)',
          }}
        >
          {children}
        </div>
        {pathname === '/my' && <footer className={style.footer}>© 2024 chaeyun-sim.</footer>}
      </div>
      {isOpen && (
        <NotificationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </main>
  );
}
