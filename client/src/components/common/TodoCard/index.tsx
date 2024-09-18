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
      <button className={style.check_box}></button>
      <div className={style.info_box}>
        <span
          className={style.todo_title}
          style={{ width: !title && !category ? '250px' : '200px' }}
        >
          {title}
        </span>
        <div className={style.todo_time}>
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
