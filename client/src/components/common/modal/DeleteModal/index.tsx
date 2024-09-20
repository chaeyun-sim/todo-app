import Modal, { ModalProps } from '..';
import { useDeleteTodo } from '../../../../hooks/queries/useTodo';
import style from './index.module.css';

export default function DeleteModal({
  isOpen,
  onClose,
  id,
}: Pick<ModalProps, 'isOpen' | 'onClose'> & { id: number }) {
  const { mutate } = useDeleteTodo();

  const deleteHandler = () => {
    mutate({ id });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='투두 삭제'
      height='130px'
    >
      <div style={{ width: '265px', marginTop: '15px' }}>
        <p>정말 삭제하시겠습니까?</p>
        <div className={style.submit_box}>
          <button
            className={`${style.submit_btn} ${style.delete_btn}`}
            onClick={deleteHandler}
          >
            삭제하기
          </button>
          <button
            className={`${style.submit_btn} ${style.cancel_btn}`}
            onClick={onClose}
          >
            취소하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
