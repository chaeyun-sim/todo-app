import style from './index.module.css';
import { MdLogout } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import Toggle from '../../components/common/Toggle';
import { useState } from 'react';
import Modal from '../../components/common/modal';
import Input from '../../components/common/Input';
import Chart from '../../components/Chart';
import { LuLogIn } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useGetUser, useLogout, useWithdrawal } from '../../hooks/queries/useAuth';
import { useCountTodos } from '../../hooks/queries/useTodo';

const PASSWORD_TEXT: {
  [key: string]: string;
} = {
  origin: '기존 비밀번호',
  new: '새 비밀번호',
  confirm: '새 비밀번호 확인',
};

export default function My() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [passwords, setPasswords] = useState<{ [key: string]: string }>({
    origin: '',
    new: '',
    confirm: '',
  });
  const isLoggedIn = localStorage.getItem('@isLoggedIn') === 'true';
  const userId = Number(localStorage.getItem('@user_id'));

  const { data } = useGetUser(userId);
  const { data: todos } = useCountTodos();
  console.log(todos);
  const { mutate: logout } = useLogout();
  const { mutate: withdrawal } = useWithdrawal();

  const logoutHandler = () => {
    logout({ id: userId });
  };
  const withdrawalHandler = () => {
    withdrawal({ id: userId });
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
        {isLoggedIn ? (
          <>
            <strong style={{ fontSize: '24px', fontFamily: 'Agbalumo' }}>{data?.user.name}</strong>
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
      {isLoggedIn && (
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
        <Toggle disabled={!isLoggedIn} />
      </div>
      {!isLoggedIn && (
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
          checked={isLoggedIn}
          disabled={!isLoggedIn}
        />
      </div>
      {!isLoggedIn && (
        <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
      )}
      {/* 비밀번호 변경 */}
      {isLoggedIn && (
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
      {isLoggedIn && (
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
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          modalTitle='비밀번호 변경'
        >
          <div style={{ marginTop: '20px' }}>
            {Object.keys(passwords).map((item, i) => (
              <div key={item}>
                <label style={{ fontSize: '14px' }}>{PASSWORD_TEXT[item]}</label>
                <Input
                  type='password'
                  value={passwords[item]}
                  onSetValue={value => setPasswords({ ...passwords, [item]: value })}
                  style={{ margin: i < 2 ? '5px 0 10px' : '5px 0 0' }}
                />
              </div>
            ))}
            <div className={style.submit_box}>
              <button className={style.submit_btn}>변경하기</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
