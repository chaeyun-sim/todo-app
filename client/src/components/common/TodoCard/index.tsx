import { useEffect, useState } from 'react';
import style from './index.module.css';
import { FaCheck } from 'react-icons/fa6';

interface TodoCardProps {
  title: string;
  startTime: string;
  endTime?: string;
  category: string;
  isCompleted?: boolean;
}

export default function TodoCard({
  title,
  startTime,
  endTime,
  category,
  isCompleted,
}: TodoCardProps) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (isCompleted) setCheck(true);
  }, [isCompleted]);

  let categoryColor = '';
  if (category === '일상') {
    categoryColor = '#ff8787';
  }

  function convertTime(time: string) {
    if (time === '') return '';

    let ampm = 'AM';
    let hour = Number(time.split(':')[0]);
    if (hour >= 12 && hour < 24) {
      hour -= 12;
      ampm = 'PM';
    }
    return `${hour}:${time.split(':')[1]} ${ampm}`;
  }

  return (
    <div
      className={
        check ? `${style.todo_container}` : `${style.todo_container} ${style.todo_container_active}`
      }
      style={{ cursor: !title ? 'default' : 'pointer' }}
    >
      {check ? (
        <button
          className={style.check_box}
          onClick={() => setCheck(false)}
        >
          <FaCheck
            style={{ marginLeft: '-5.5px', marginTop: '-1px' }}
            size={12}
            color={'#E8E8E8'}
          />
        </button>
      ) : (
        <button
          className={style.check_box}
          onClick={() => setCheck(true)}
        />
      )}
      <div className={style.info_box}>
        <span
          className={style.todo_title}
          style={{
            width: !title && !category ? '250px' : '200px',
            textDecorationLine: check ? 'line-through' : 'none',
            textDecorationColor: '#BABABA',
            color: check ? '#E8E8E8' : '#a3a3a3',
          }}
        >
          {title}
        </span>
        <div
          className={style.todo_time}
          style={{
            textDecorationLine: check ? 'line-through' : 'none',
            textDecorationColor: '#BABABA',
            color: check ? '#E8E8E8' : '#a3a3a3',
          }}
        >
          {endTime
            ? `${convertTime(startTime)} - ${convertTime(endTime)}`
            : `${convertTime(startTime)}`}
        </div>
      </div>
      {category && (
        <div
          className={style.category}
          style={{ backgroundColor: categoryColor }}
        />
      )}
    </div>
  );
}
