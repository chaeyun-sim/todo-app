import style from './index.module.css';
import { MdLogout } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import Toggle from '../../components/common/Toggle';
import { useState } from 'react';
import Chart from '../../components/Chart';
import { LuLogIn } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useCountTodos } from '../../hooks/queries/useTodo';
import { useLogout, useWithdrawal } from '../../hooks/queries/useUser';
import ChangePasswordModal from '../../components/common/modal/ChangePasswordModal';

export default function My() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('@user')!);

  const { data: todos } = useCountTodos();
  const { mutate: logout } = useLogout();
  const { mutate: withdrawal } = useWithdrawal();

  const logoutHandler = () => {
    logout({ id: user?.id });
  };
  const withdrawalHandler = () => {
    withdrawal({ id: user?.id });
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        {user ? (
          <>
            <strong style={{ fontSize: '24px', fontFamily: 'Agbalumo' }}>{user?.name}</strong>
            <span style={{ fontSize: '16px', marginTop: '8px', marginLeft: '8px' }}>
              {' '}
              님, 반갑습니다!
            </span>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>
            <span style={{ fontSize: '22px', marginRight: '8px' }}>로그인</span>
            <LuLogIn
              size={20}
              style={{ marginBottom: '-2px' }}
            />
          </button>
        )}
      </div>
      <div>
        <div className={style.float_box}>지금까지 {todos?.count}개의 투두를 완료했어요!</div>
      </div>
      {user && (
        <>
          <div style={{ marginTop: '40px' }}>
            <strong style={{ fontSize: '18px', fontWeight: '500' }}>통계</strong>
          </div>
          <Chart />
        </>
      )}
      {/* 알림 설정 */}
      <div
        style={{
          marginTop: '27px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong style={{ fontSize: '18px', fontWeight: '500' }}>알림 설정</strong>
        <Toggle disabled={!user} />
      </div>
      {!user && (
        <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
      )}

      {/* <div
        style={{
          marginTop: '27px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontSize: '18px', fontWeight: '500' }}>데이터 저장</strong>
        </div>
        <Toggle
          checked={isLoggedIn}
          disabled={true}
        />
      </div>
      {!isLoggedIn && (
        <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
      )} */}
      {/* 비밀번호 변경 */}
      {user && (
        <div style={{ marginTop: '27px', cursor: 'pointer' }}>
          <strong
            style={{ fontSize: '18px', fontWeight: '500' }}
            onClick={() => setIsOpen(true)}
          >
            비밀번호 변경
          </strong>
        </div>
      )}
      <div></div>
      {user && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            position: 'absolute',
            bottom: '47px',
            justifyContent: 'space-between',
          }}
        >
          <button
            className={style.btn}
            onClick={logoutHandler}
          >
            로그아웃 <MdLogout />
          </button>
          <button
            className={style.btn}
            onClick={withdrawalHandler}
          >
            회원탈퇴 <FiDelete />
          </button>
        </div>
      )}
      {isOpen && (
        <ChangePasswordModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
