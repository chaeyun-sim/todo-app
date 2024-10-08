import { PropsWithChildren, Suspense, useEffect } from 'react';
import style from './index.module.css';
import { MdClose } from '../../icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  modalTitle: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width,
  height,
  modalTitle,
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={style.modalOverlay}
      onClick={onClose}
    >
      <div
        className={style.modalContent}
        style={{ width: width || '290px', height: height || '350px' }}
        onClick={e => e.stopPropagation()}
      >
        <div className={style.modal_header}>
          <strong style={{ fontSize: '20px' }}>{modalTitle}</strong>
          <button
            onClick={onClose}
            className={style.close_btn}
          >
            <Suspense fallback={<span>...</span>}>
              <MdClose size={24} />
            </Suspense>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
