import { PropsWithChildren, useState } from 'react';
import style from './index.module.css';
import { FiMenu } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { MdNavigateBefore } from 'react-icons/md';
import { PiSunLight, PiMoonLight } from 'react-icons/pi';
import { IoNotificationsOutline } from 'react-icons/io5';

export default function Layout({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const [changeToDark, setChangeToDark] = useState(false);

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
                <Link to={'/'}>
                  <MdNavigateBefore size={26} />
                </Link>
                {changeToDark ? (
                  <button onClick={() => setChangeToDark(false)}>
                    <PiMoonLight
                      size={20}
                      style={{ marginBottom: '5px' }}
                    />
                  </button>
                ) : (
                  <button onClick={() => setChangeToDark(true)}>
                    <PiSunLight
                      size={20}
                      style={{ marginBottom: '5px' }}
                    />
                  </button>
                )}
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
                <Link to='/'>
                  <IoNotificationsOutline size={24} />
                </Link>
                <Link
                  to={'/my'}
                  className={style.link}
                >
                  <FiMenu size={22} />
                </Link>
              </div>
            )}
          </header>
        )}
        <div className={style.children}>{children}</div>
      </div>
    </main>
  );
}
