import { useEffect, useState } from 'react';
import Modal, { ModalProps } from '..';
import style from './index.module.css';

interface MemoModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  onSetText: (value: string) => void;
  data: string;
}

export default function MemoModal({ isOpen, onClose, onSetText, data }: MemoModalProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (data) {
      setText(data);
    }
  }, [data]);

  const submitHandler = () => {
    if (text) {
      onSetText(text);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='메모'
    >
      <div style={{ width: '265px', marginTop: '15px', height: '210px' }}>
        <textarea
          style={{
            resize: 'none',
            borderRadius: '8px',
            width: '100%',
            height: '100%',
            border: '1.5px solid #d7d7d7',
            padding: '10px',
            overflowY: 'hidden',
            outline: 'none',
          }}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className={style.submit_box}>
          <button
            className={style.submit_btn}
            onClick={submitHandler}
          >
            저장하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
