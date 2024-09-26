import style from './index.module.css';
import { MdLogout } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import Toggle from '../../components/common/Toggle';
import { useState } from 'react';
import Chart from '../../components/Chart';
import { LuLogIn } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useGetTodos } from '../../hooks/queries/useTodo';
import { useLogout, useWithdrawal } from '../../hooks/queries/useUser';
import ChangePasswordModal from '../../components/common/modal/ChangePasswordModal';
import { TodoItem } from '../../types/types';

export default function My() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('@user')!);

  const { data: todos } = useGetTodos({ target: 'today', userId: user?.id });
  const { mutate: logout } = useLogout();
  const { mutate: withdrawal } = useWithdrawal();

  const token = localStorage.getItem('@token');

  const todoCount = todos?.data?.filter((el: TodoItem) => el.category_id);

  const logoutHandler = () => {
    if (token) {
      logout({ id: user?.id });
    } else {
      alert('로그아웃 실패');
    }
  };
  const withdrawalHandler = () => {
    if (token && user?.id) {
      withdrawal({ id: user?.id });
    } else {
      alert('탈퇴 실패');
    }
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
        {user?.id ? (
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
      {user?.id && (
        <div>
          <div className={style.float_box}>
            지금까지 {todos?.data?.length}개의 투두를 완료했어요!
          </div>
        </div>
      )}
      {user?.id && (
        <>
          <div style={{ marginTop: '40px' }}>
            <strong style={{ fontSize: '18px', fontWeight: '500' }}>통계</strong>
          </div>
          {todoCount?.length && todos?.data?.length && <Chart />}
          {todoCount?.length === 0 && todos?.data?.length > 0 && (
            <span style={{ fontSize: '13px' }}>카테고리를 등록해주세요 :)</span>
          )}

          {!todoCount?.length && !todos?.data?.length && (
            <span style={{ fontSize: '13px' }}>투두를 등록해주세요 :)</span>
          )}
        </>
      )}

      {!user && (
        <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
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
      {!user?.id && (
        <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
      )}

      <div
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
          checked={!!token}
          disabled={true}
        />
      </div>
      {!token && (
        <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
      )}
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
