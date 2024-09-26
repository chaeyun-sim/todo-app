import { useState } from 'react';
import Modal, { ModalProps } from '..';
import Input from '../../Input';
import style from './index.module.css';
import { useChangePassword } from '../../../../hooks/queries/useUser';

const PASSWORD_TEXT: {
  [key: string]: string;
} = {
  origin: '기존 비밀번호',
  new: '새 비밀번호',
  confirm: '새 비밀번호 확인',
};

export default function ChangePasswordModal({ isOpen, onClose }: Omit<ModalProps, 'modalTitle'>) {
  const [passwords, setPasswords] = useState<{ [key: string]: string }>({
    origin: '',
    new: '',
    confirm: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate } = useChangePassword();
  const user = JSON.parse(localStorage.getItem('@user')!);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(passwords).every(el => el)) {
      setErrorMessage('모두 입력되어야 합니다.');
    }

    if (passwords.new !== passwords.confirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    }

    if (!errorMessage) {
      mutate({
        id: user.id,
        origin: passwords.origin,
        newPassword: passwords.new,
        newConfirm: passwords.confirm,
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='비밀번호 변경'
    >
      <form
        style={{ marginTop: '20px' }}
        onSubmit={submitHandler}
      >
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
          <span className={style.error_message}>{errorMessage}</span>
          <button
            className={style.submit_btn}
            type='submit'
          >
            변경하기
          </button>
        </div>
      </form>
    </Modal>
  );
}
