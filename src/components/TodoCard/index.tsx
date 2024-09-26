/* eslint-disable prefer-const */
import style from './index.module.css';
import { FaCheck } from 'react-icons/fa6';
import { TodoItem } from '../../types/types';
import { FiFileText } from 'react-icons/fi';
import { useSingleCategory } from '../../hooks/queries/useCategory';
import { useTodoChecked } from '../../hooks/queries/useTodo';
import { isYesterday } from 'date-fns';
import { MdOutlineDelete } from 'react-icons/md';
import { categoriesWithoutToken } from '../common/modal/SelectCategoryModal';
import { useEffect, useState } from 'react';

interface TodoCardProps {
  data: TodoItem;
  onRefetch: () => void;
  openDeleteModal: () => void;
  onSetId: (id: number) => void;
}

export default function TodoCard({ data, onRefetch, openDeleteModal, onSetId }: TodoCardProps) {
  let { id, is_completed, title, start_date, end_date, memo, category_id } = data;
  const [checked, setChecked] = useState(false);

  const { data: category } = useSingleCategory(Number(category_id));
  const { mutate } = useTodoChecked();

  const token = localStorage.getItem('@token');
  const checkCompleted = token ? is_completed : checked;

  useEffect(() => {
    setChecked(is_completed);
  }, []);

  const isExpired = () => {
    if (!start_date) return false;
    const createdDate = new Date(start_date);
    return isYesterday(createdDate);
  };

  const expired = isExpired();

  const convertTime = (date: string) => {
    let ampm = 'AM';

    const str = new Date(date);
    let hour = str.getHours();
    const minute = str.getMinutes();

    if (hour >= 12 && hour < 24) {
      if (hour > 12) hour -= 12;
      ampm = 'PM';
    }

    return `${hour}:${String(minute).padStart(2, '0')} ${ampm}`;
  };

  const checkHandler = () => {
    if (!expired) {
      if (token) {
        mutate({ id: id });
        onRefetch();
      } else {
        setChecked(!checked);
      }
    }
  };

  return (
    <div
      className={
        expired
          ? `${style.todo_container_expired}`
          : checkCompleted
          ? `${style.todo_container}`
          : `${style.todo_container} ${style.todo_container_active}`
      }
      style={{ cursor: !title || expired ? 'default' : 'pointer' }}
    >
      {checkCompleted ? (
        <button
          className={style.check_box}
          onClick={checkHandler}
          style={{ cursor: expired ? 'default' : 'pointer' }}
        >
          <FaCheck
            style={{ marginLeft: '-5.5px', marginTop: '-1px' }}
            size={12}
            color={'#cacaca'}
          />
        </button>
      ) : (
        <button
          className={style.check_box}
          onClick={checkHandler}
          style={{ cursor: expired ? 'default' : 'pointer' }}
        />
      )}
      <div className={style.info_box}>
        <span
          className={style.todo_title}
          style={{
            width: !title && !category_id ? '250px' : '200px',
            textDecorationLine: checkCompleted ? 'line-through' : 'none',
            textDecorationColor: '#BABABA',
            color: checkCompleted || expired ? '#cacaca' : '#404040',
          }}
        >
          {title}
        </span>
        <div
          className={style.todo_time}
          style={{
            textDecorationLine: checkCompleted ? 'line-through' : 'none',
            textDecorationColor: '#BABABA',
            color: checkCompleted || expired ? '#cacaca' : '#404040',
          }}
        >
          {convertTime(start_date) === convertTime(end_date)
            ? convertTime(start_date)
            : `${convertTime(start_date)} - ${convertTime(end_date)}`}
        </div>
        {!checkCompleted && memo && (
          <div
            className={style.todo_memo}
            style={{
              color: checkCompleted || expired ? '#E8E8E8' : '#404040',
            }}
          >
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
                margin: 0,
              }}
            >
              {memo}
            </pre>
          </div>
        )}
        {!checkCompleted && (
          <div className={`${style.todo_memo} ${style.edit}`}>
            <button
              style={{ width: '25px' }}
              onClick={() => {
                onSetId(id);
                openDeleteModal();
              }}
            >
              <MdOutlineDelete
                size={18}
                stroke='1'
              />
            </button>
          </div>
        )}
      </div>
      {memo && (
        <div
          className={style.category}
          style={{ right: '40px' }}
        >
          <FiFileText color={checkCompleted || expired ? '#cacaca' : '#505050'} />
        </div>
      )}
      {category_id! > 0 && (
        <div
          className={style.category}
          style={{
            backgroundColor: token
              ? category?.data?.[0].color
              : categoriesWithoutToken.filter(el => el.id === category_id)[0].color,
          }}
        />
      )}
    </div>
  );
}
