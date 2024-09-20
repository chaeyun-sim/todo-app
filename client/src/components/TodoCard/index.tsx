/* eslint-disable prefer-const */
import style from './index.module.css';
import { FaCheck } from 'react-icons/fa6';
import { TodoItem } from '../../types/types';
import { FiFileText } from 'react-icons/fi';
import { useSingleCategory } from '../../hooks/queries/useCategory';
import { useTodoChecked } from '../../hooks/queries/useTodo';
import { isBefore, isYesterday, startOfToday } from 'date-fns';
import { MdOutlineDelete } from 'react-icons/md';

interface TodoCardProps {
  data: TodoItem;
  onRefetch: () => void;
  openDeleteModal: () => void;
  onSetId: (id: number) => void;
}

export default function TodoCard({ data, onRefetch, openDeleteModal, onSetId }: TodoCardProps) {
  const { id, is_completed, title, start_date, end_date, memo, category_id, created_at } = data;

  const { data: category } = useSingleCategory(Number(category_id));
  const { mutate } = useTodoChecked();

  const isExpired = () => {
    if (!created_at) return false;
    const createdDate = new Date(created_at);
    return isYesterday(createdDate) || isBefore(createdDate, startOfToday());
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
      mutate({ id: id });
      onRefetch();
    }
  };

  return (
    <div
      className={
        expired
          ? `${style.todo_container_expired}`
          : is_completed
          ? `${style.todo_container}`
          : `${style.todo_container} ${style.todo_container_active}`
      }
      style={{ cursor: !title || expired ? 'default' : 'pointer' }}
    >
      {is_completed ? (
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
            textDecorationLine: is_completed || expired ? 'line-through' : 'none',
            textDecorationColor: '#BABABA',
            color: is_completed || expired ? '#cacaca' : '#404040',
          }}
        >
          {title}
        </span>
        <div
          className={style.todo_time}
          style={{
            textDecorationLine: is_completed || expired ? 'line-through' : 'none',
            textDecorationColor: '#BABABA',
            color: is_completed || expired ? '#cacaca' : '#404040',
          }}
        >
          {convertTime(start_date) === convertTime(end_date)
            ? convertTime(start_date)
            : `${convertTime(start_date)} - ${convertTime(end_date)}`}
        </div>
        {memo && (
          <div
            className={style.todo_memo}
            style={{
              color: is_completed || expired ? '#E8E8E8' : '#404040',
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
      </div>
      {memo && (
        <div
          className={style.category}
          style={{ right: '40px' }}
        >
          <FiFileText color={is_completed || expired ? 'transparent' : '#505050'} />
        </div>
      )}
      {category_id! > 0 && !is_completed && (
        <div
          className={style.category}
          style={{ backgroundColor: category?.data[0].color }}
        />
      )}
    </div>
  );
}
