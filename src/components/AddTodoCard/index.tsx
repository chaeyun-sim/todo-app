/* eslint-disable react-hooks/exhaustive-deps */
import { KeyboardEventHandler, useEffect, useState } from 'react';
import { TodoItem } from '../../types/types';
import style from './index.module.css';
import { useSingleCategory } from '../../hooks/queries/useCategory';
import { categoriesWithoutToken } from '../common/modal/SelectCategoryModal';

interface AddTodoCardProps {
  inputs: Omit<TodoItem, 'id' | 'is_completed'>;
  onSetInputs: (item: Omit<TodoItem, 'id' | 'is_completed'>) => void;
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

  const { category_id, title, start_date, end_date } = inputs;

  const { data: category, refetch } = useSingleCategory(Number(category_id));

  const token = localStorage.getItem('@token');

  useEffect(() => {
    refetch();
  }, [category_id, inputs]);

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      onSetInputs({ ...inputs, title: text });
      setModifyText(false);
    }
  };

  const cutText = () => {
    if (inputs.memo!.split('\n').length > 1) return inputs.memo!.split('\n')[0] + '...';
    if (inputs.memo!.length > 20) return inputs.memo!.slice(0, 20) + '...';

    return inputs.memo;
  };

  const convertTime = (timeString: string | undefined) => {
    if (!timeString) return '';
    const [datePart, timePart] = timeString.split(' ');
    if (!datePart || !timePart) return '';

    const [hours, minutes] = timePart.split(':');
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12;

    return `${hours12}:${minutes} ${ampm}`;
  };

  const getTime = () => {
    const startTime = convertTime(start_date);
    const endTime = convertTime(end_date);

    if (!startTime && !endTime) return '';
    if (startTime === endTime) return startTime;
    if (startTime && endTime) return `${startTime} ~ ${endTime}`;
    if (startTime) return startTime;
    return endTime;
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
                style={{ width: !title && !category_id ? '250px' : '200px' }}
                onClick={() => setModifyText(true)}
              >
                {text}
              </span>
            )}
            {!inputs.category_id && (
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
            style={{ marginLeft: !start_date ? '-3px' : 0 }}
          >
            {inputs.start_date ? (
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
          {inputs.category_id! > 0 && (
            <button
              className={style.category}
              style={{
                backgroundColor: token
                  ? category?.data[0].color || 'white'
                  : categoriesWithoutToken.filter(el => el.id === inputs.category_id)[0].color ||
                    'white',
              }}
              onClick={openCategoryModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
