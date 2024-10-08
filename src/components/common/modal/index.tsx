import { lazy, PropsWithChildren, useEffect } from 'react';
import style from './index.module.css';

const MdClose = lazy(() => import('react-icons/md').then(mod => ({ default: mod.MdClose })));

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
            <MdClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
