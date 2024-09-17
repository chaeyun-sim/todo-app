import { TodoItem } from '../../../types/types';
import style from './index.module.css';

interface AddTodoCardProps {
  inputs: Omit<TodoItem, 'id'>;
  onSetInputs: (item: Omit<TodoItem, 'id'>) => void;
  openCategoryModal: () => void;
  openTimeModal: () => void;
}

export default function AddTodoCard({
  onSetInputs,
  inputs,
  openCategoryModal,
  openTimeModal,
}: AddTodoCardProps) {
  const keyDownHandler = () => {};

  return (
    <div className={style.todo_container}>
      <div className={style.check_box}></div>
      <div className={style.info_box}>
        <span className={style.todo_title}>
          <input
            className={style.blank_input}
            placeholder='Title...'
            style={{ fontSize: '13px' }}
            value={inputs.title}
            onChange={e => onSetInputs({ ...inputs, title: e.target.value })}
            onKeyDown={keyDownHandler}
          />
          <button
            className={style.blank_btn}
            style={{ fontSize: '11px' }}
            onClick={openCategoryModal}
          >
            카테고리 선택하기
          </button>
        </span>
        <div className={style.todo_time}>
          <button
            className={style.blank_btn}
            style={{ fontSize: '11px', marginLeft: '-4px' }}
            onClick={openTimeModal}
          >
            시간 설정하기
          </button>
        </div>
      </div>
    </div>
  );
}
