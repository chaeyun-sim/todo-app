import TodoCard from '../../components/common/TodoCard';
import style from './index.module.css';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import AddTodoCard from '../../components/common/AddTodoCard';
import { TodoItem } from '../../types/types';
import SelectCategoryModal from '../../components/common/modal/SelectCategoryModal';
import SelectTimeModal from '../../components/common/modal/SelectTimeModal';
import MemoModal from '../../components/common/modal/MemoModal';

const TITLES = Object.assign({
  0: 'Today',
  1: 'Tomorrow',
  '-1': 'Yesterday',
});

export default function Todo() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [current, setCurrent] = useState(0);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [openModal, setOpenModal] = useState({
    isCategoryModalOpen: false,
    isTimeModalOpen: false,
    isMemoModalOpen: false,
  });
  const [todaysText, setTodaysText] = useState('');
  const [textCompleted, setTextCompleted] = useState(false);
  const [inputs, setInputs] = useState<Omit<TodoItem, 'id'>>({
    title: '',
    startTime: '',
    endTime: '',
    category: '',
    memo: '',
  });

  useEffect(() => {
    if (current === -1) setIsAdding(false);
  }, [current]);

  const addNewTodo = () => {
    if (inputs.title && inputs.startTime) {
      const newTodos = {
        id: todos.length + 1,
        ...inputs,
      };

      setTodos([...todos, newTodos]);
      setInputs({ title: '', startTime: '', endTime: '', category: '' });
      setIsAdding(false);
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
            <button
              className={style.nav_btn}
              onClick={() => (current === -1 ? null : setCurrent(current - 1))}
            >
              <MdNavigateBefore size={25} />
            </button>
            {TITLES[current]}
            <button
              className={style.nav_btn}
              onClick={() => (current === 1 ? null : setCurrent(current + 1))}
            >
              <MdNavigateNext size={25} />
            </button>
          </div>
        </div>
        {current === 0 && (
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
        )}
      </div>
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            {...todo}
          />
        ))}
      </div>
      {current > -1 && isAdding && (
        <AddTodoCard
          inputs={inputs}
          onSetInputs={setInputs}
          openCategoryModal={() => setOpenModal({ ...openModal, isCategoryModalOpen: true })}
          openTimeModal={() => setOpenModal({ ...openModal, isTimeModalOpen: true })}
          openMemoModal={() => setOpenModal({ ...openModal, isMemoModalOpen: true })}
        />
      )}
      {!todos.length && !isAdding && (
        <div
          style={{
            height: '50%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>No Todos</h1>
        </div>
      )}
      {current > -1 && isAdding && (
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
      )}
      {current > -1 && !isAdding && (
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
      {openModal.isCategoryModalOpen && (
        <SelectCategoryModal
          isOpen={openModal.isCategoryModalOpen}
          onClose={() => setOpenModal({ ...openModal, isCategoryModalOpen: false })}
          onSetCategory={category => setInputs({ ...inputs, category })}
        />
      )}
      {openModal.isTimeModalOpen && (
        <SelectTimeModal
          isOpen={openModal.isTimeModalOpen}
          onClose={() => setOpenModal({ ...openModal, isTimeModalOpen: false })}
          onSetTime={times => setInputs({ ...inputs, startTime: times.start, endTime: times.end })}
          data={{
            startTime: inputs.startTime,
            endTime: inputs.endTime,
          }}
        />
      )}
      {openModal.isMemoModalOpen && (
        <MemoModal
          isOpen={openModal.isMemoModalOpen}
          onClose={() => setOpenModal({ ...openModal, isMemoModalOpen: false })}
          onSetText={text => setInputs({ ...inputs, memo: text })}
          data={inputs.memo as string}
        />
      )}
    </div>
  );
}
