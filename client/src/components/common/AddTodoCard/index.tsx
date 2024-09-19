import { KeyboardEventHandler, useState } from 'react';
import { TodoItem } from '../../../types/types';
import style from './index.module.css';

interface AddTodoCardProps {
  inputs: Omit<TodoItem, 'id'>;
  onSetInputs: (item: Omit<TodoItem, 'id'>) => void;
  openCategoryModal: () => void;
  openTimeModal: () => void;
  openMemoModal: () => void;
}

export default function AddTodoCard({
  onSetInputs,
  inputs,
  openCategoryModal,
  openTimeModal,
  openMemoModal,
}: AddTodoCardProps) {
  const [text, setText] = useState('');
  const [modifyText, setModifyText] = useState(true);

  const { title, startTime, endTime, category } = inputs;

  let categoryColor = '';
  if (category === '일상') {
    categoryColor = '#ff8787';
  }

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      onSetInputs({ ...inputs, title: text });
      setModifyText(false);
    }
  };

  const convertTime = (time: string) => {
    if (time === '') return '';

    let ampm = 'AM';
    let hour = Number(time.split(':')[0]);
    if (hour >= 12 && hour < 24) {
      if (hour > 12) hour -= 12;
      ampm = 'PM';
    }
    return `${hour}:${time.split(':')[1]} ${ampm}`;
  };

  const cutText = () => {
    if (inputs.memo!.split('\n').length > 1) return inputs.memo!.split('\n')[0] + '...';
    if (inputs.memo!.length > 20) return inputs.memo!.slice(0, 20) + '...';

    return inputs.memo;
  };

  const getTime = () => {
    if (startTime === endTime || !endTime) {
      return convertTime(startTime);
    } else {
      return `${convertTime(startTime)} - ${convertTime(endTime)}`;
    }
  };

  return (
    <div className={style.todo_container}>
      <div style={{ cursor: !title ? 'default' : 'pointer', display: 'flex' }}>
        <button className={style.check_box}></button>
        <div className={style.info_box}>
          <span
            className={style.todo_title}
            style={{ marginLeft: !title ? '-3px' : 0 }}
          >
            {modifyText ? (
              <input
                className={style.blank_input}
                placeholder='Title...'
                style={{ fontSize: '13px', flex: 1 }}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={keyDownHandler}
                onBlur={() => onSetInputs({ ...inputs, title: text })}
              />
            ) : (
              <span
                className={style.todo_title}
                style={{ width: !title && !category ? '250px' : '200px' }}
                onClick={() => setModifyText(true)}
              >
                {text}
              </span>
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
                {getTime()}
              </div>
            ) : (
              <button
                className={style.blank_btn}
                style={{ fontSize: '11px', marginLeft: '-4px', marginTop: '4px' }}
                onClick={openTimeModal}
              >
                시간 설정하기
              </button>
            )}
          </div>
          {inputs.memo ? (
            <div
              style={{ fontSize: '11px', color: '#737373', marginTop: '6px', cursor: 'pointer' }}
              onClick={openMemoModal}
            >
              {cutText()}
            </div>
          ) : (
            <div
              style={{ fontSize: '11px', color: '#cacaca', marginTop: '6px', cursor: 'pointer' }}
              onClick={openMemoModal}
            >
              + 메모
            </div>
          )}
          {inputs.category && (
            <div
              className={style.category}
              style={{ backgroundColor: categoryColor }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
