import { useEffect } from 'react';
import { TodoItem } from '../../../types/types';
import style from './index.module.css';

interface AddTodoCardProps {
  inputs: Omit<TodoItem, 'id'>;
  onSetInputs: (item: Omit<TodoItem, 'id'>) => void;
  openCategoryModal: () => void;
  openTimeModal: () => void;
  isAdded: boolean;
}

export default function AddTodoCard({
  onSetInputs,
  inputs,
  openCategoryModal,
  openTimeModal,
  isAdded,
}: AddTodoCardProps) {
  useEffect(() => {}, []);

  const { title, startTime, endTime, category } = inputs;
  let categoryColor = '';
  if (category === '일상') {
    categoryColor = '#ff8787';
  }

  const keyDownHandler = () => {};

  const convertTime = (time: string) => {
    if (time === '') return '';

    let ampm = 'AM';
    let hour = Number(time.split(':')[0]);
    if (hour >= 12 && hour < 24) {
      hour -= 12;
      ampm = 'PM';
    }
    return `${hour}:${time.split(':')[1]} ${ampm}`;
  };

  return (
    <div
      className={style.todo_container}
      style={{ cursor: !title ? 'default' : 'pointer' }}
    >
      <button className={style.check_box}></button>
      <div className={style.info_box}>
        <span
          className={style.todo_title}
          style={{ marginLeft: !title ? '-3px' : 0 }}
        >
          {isAdded && title ? (
            <span
              className={style.todo_title}
              style={{ width: !title && !category ? '250px' : '200px' }}
            >
              {title}
            </span>
          ) : (
            <input
              className={style.blank_input}
              placeholder='Title...'
              style={{ fontSize: '13px', flex: 1 }}
              onChange={e => onSetInputs({ ...inputs, title: e.target.value })}
              onKeyDown={keyDownHandler}
            />
          )}
          {!inputs.category && (
            <button
              className={style.blank_btn}
              style={{ fontSize: '11px' }}
              onClick={openCategoryModal}
            >
              카테고리 선택하기
            </button>
          )}
        </span>
        <div
          className={style.todo_time}
          style={{ marginLeft: !startTime ? '-3px' : 0 }}
        >
          {inputs.startTime ? (
            <div
              className={style.todo_time}
              onClick={openTimeModal}
            >
              {endTime.split(':')[0] === '00'
                ? `${convertTime(startTime)}`
                : `${convertTime(startTime)} - ${convertTime(endTime)}`}
            </div>
          ) : (
            <button
              className={style.blank_btn}
              style={{ fontSize: '11px', marginLeft: '-4px' }}
              onClick={openTimeModal}
            >
              시간 설정하기
            </button>
          )}
        </div>
      </div>
      {inputs.category && (
        <div
          className={style.category}
          style={{ backgroundColor: categoryColor }}
        />
      )}
    </div>
  );
}
