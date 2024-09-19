import style from './index.module.css';
import { MdLogout } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import Toggle from '../../components/common/Toggle';
import { useState } from 'react';
import Modal from '../../components/common/modal';
import Input from '../../components/common/Input';
import Chart from '../../components/Chart';

const PASSWORD_TEXT: {
  [key: string]: string;
} = {
  origin: '기존 비밀번호',
  new: '새 비밀번호',
  confirm: '새 비밀번호 확인',
};

export default function My() {
  const [isOpen, setIsOpen] = useState(false);
  const [passwords, setPasswords] = useState<{ [key: string]: string }>({
    origin: '',
    new: '',
    confirm: '',
  });
  const count = 1;

  const logoutHandler = () => {};
  const withdrawalHandler = () => {};

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
        <strong style={{ fontSize: '24px', fontFamily: 'Agbalumo' }}>tester</strong>
        <span style={{ fontSize: '16px', marginTop: '8px', marginLeft: '8px' }}>
          {' '}
          님, 반갑습니다!
        </span>
      </div>
      <div>
        <div className={style.float_box}>지금까지 {count}개의 투두를 완료했어요!</div>
      </div>
      <div style={{ marginTop: '40px' }}>
        <strong style={{ fontSize: '18px', fontWeight: '500' }}>통계</strong>
      </div>
      <Chart />
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
        <Toggle />
      </div>
      <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>

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
        <Toggle />
      </div>
      <span style={{ fontSize: '13px', marginTop: '5px' }}>* 로그인 시 활성화됩니다.</span>
      {/* 비밀번호 변경 */}
      <div style={{ marginTop: '27px', cursor: 'pointer' }}>
        <strong
          style={{ fontSize: '18px', fontWeight: '500' }}
          onClick={() => setIsOpen(true)}
        >
          비밀번호 변경
        </strong>
      </div>
      <div></div>
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
