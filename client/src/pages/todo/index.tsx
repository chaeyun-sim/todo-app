import TodoCard from '../../components/common/TodoCard';
import style from './index.module.css';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { ChangeEvent, useRef, useState } from 'react';
import AddTodoCard from '../../components/common/AddTodoCard';
import { TodoItem } from '../../types/types';
import SelectCategoryModal from '../../components/common/modal/SelectCategoryModal';
import SelectTimeModal from '../../components/common/modal/SelectTimeModal';

export default function Todo() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [todaysText, setTodaysText] = useState('');
  const [textCompleted, setTextCompleted] = useState(false);
  const [inputs, setInputs] = useState<Omit<TodoItem, 'id'>>({
    title: '',
    startTime: '',
    endTime: '',
    category: '',
  });

  const addNewTodo = () => {
    setIsAdded(true);

    if (inputs.title && inputs.startTime) {
      const newTodos = {
        id: todos.length + 1,
        ...inputs,
      };

      setTodos([...todos, newTodos]);
      setInputs({ title: '', startTime: '', endTime: '', category: '' });
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const lines = value.split('\n');
    if (lines.length <= 2 && value.length <= 40) {
      setTodaysText(value);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title_box}>
          <div className={style.title}>
            <button className={style.nav_btn}>
              <MdNavigateBefore size={25} />
            </button>
            Today
            <button className={style.nav_btn}>
              <MdNavigateNext size={25} />
            </button>
          </div>
        </div>
        <div className={style.text_box}>
          {textCompleted && todaysText ? (
            <span
              className={style.text}
              onClick={() => {
                setTextCompleted(false);
                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(todaysText.length, todaysText.length);
                  }
                }, 0);
              }}
            >
              {todaysText}
            </span>
          ) : (
            <textarea
              ref={textareaRef}
              className={style.input}
              value={todaysText}
              onChange={changeHandler}
              onBlur={() => setTextCompleted(true)}
              placeholder="Today's Text..."
              rows={2}
            />
          )}
        </div>
      </div>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            title={todo.title}
            startTime={todo.startTime}
            endTime={todo.endTime}
            category={todo.category}
          />
        ))}
      </div>
      {isAdding && (
        <AddTodoCard
          inputs={inputs}
          onSetInputs={setInputs}
          openCategoryModal={() => setIsCategoryModalOpen(true)}
          openTimeModal={() => setIsTimeModalOpen(true)}
          isAdded={isAdded}
        />
      )}
      {isAdding ? (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '47px',
            width: '100%',
            gap: '8px',
          }}
        >
          <button
            className={style.cancel_btn}
            onClick={() => setIsAdding(false)}
          >
            취소
          </button>
          <button
            className={style.add_btn}
            onClick={addNewTodo}
          >
            투두 추가하기
          </button>
        </div>
      ) : (
        <div
          className={style.add_todo_float}
          onClick={() => setIsAdding(true)}
        >
          <FaPlus
            color='#FAFAFA'
            size={22}
          />
        </div>
      )}
      {isCategoryModalOpen && (
        <SelectCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSetCategory={category => setInputs({ ...inputs, category })}
        />
      )}
      {isTimeModalOpen && (
        <SelectTimeModal
          isOpen={isTimeModalOpen}
          onClose={() => setIsTimeModalOpen(false)}
          onSetTime={times => setInputs({ ...inputs, startTime: times.start, endTime: times.end })}
          data={{
            startTime: inputs.startTime,
            endTime: inputs.endTime,
          }}
        />
      )}
    </div>
  );
}
