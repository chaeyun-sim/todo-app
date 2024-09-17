import style from './index.module.css';

interface TodoCardProps {
  title: string;
  startTime: string;
  endTime?: string;
  category: string;
}

export default function TodoCard({ title, startTime, endTime, category }: TodoCardProps) {
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

  const keyDownHandler = () => {};

  return (
    <div
      className={style.todo_container}
      style={{ cursor: !title ? 'default' : 'pointer' }}
    >
      <div className={style.check_box}></div>
      <div className={style.info_box}>
        <span
          className={style.todo_title}
          style={{ width: !title && !category ? '250px' : '200px' }}
        >
          {title || (
            <input
              className={style.blank_input}
              placeholder='Title...'
              style={{ fontSize: '13px' }}
              onKeyDown={keyDownHandler}
            />
          )}
          {!category && (
            <button
              className={style.blank_btn}
              style={{ fontSize: '11px' }}
            >
              카테고리 선택하기
            </button>
          )}
        </span>
        <div className={style.todo_time}>
          {!startTime && !endTime && (
            <button
              className={style.blank_btn}
              style={{ fontSize: '11px' }}
            >
              시간 설정하기
            </button>
          )}
          {endTime
            ? `${convertTime(startTime)} - ${convertTime(endTime)}`
            : `${convertTime(startTime)}`}
        </div>
      </div>
      <div
        className={style.category}
        style={{ backgroundColor: categoryColor }}
      />
    </div>
  );
}
