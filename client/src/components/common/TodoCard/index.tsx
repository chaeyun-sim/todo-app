import style from './index.module.css';

interface TodoCardProps {
  title: string;
  startTime: string;
  endTime: string;
  category: string;
}

export default function TodoCard({ title, startTime, endTime, category }: TodoCardProps) {
  let categoryColor = '';
  if (category === '일상') {
    categoryColor = '#ff8787';
  }

  function convertTime(time: string) {
    let hour = Number(time.split(':')[0]);

    if (hour >= 12 && hour < 24) {
      hour -= 12;
    }

    return `${hour}:${time.split(':')[1]}`;
  }

  return (
    <div className={style.todo_container}>
      <div className={style.check_box}></div>
      <div className={style.info_box}>
        <span className={style.todo_title}>{title}</span>
        <span className={style.todo_time}>
          {convertTime(startTime)} PM - {convertTime(endTime)} PM
        </span>
      </div>
      <div
        className={style.category}
        style={{ backgroundColor: categoryColor }}
      />
    </div>
  );
}
