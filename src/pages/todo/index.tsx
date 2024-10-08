import TodoCard from '../../components/TodoCard';
import style from './index.module.css';
import { lazy, useEffect, useState } from 'react';
import AddTodoCard from '../../components/AddTodoCard';
import { TodoItem } from '../../types/types';
import SelectCategoryModal from '../../components/common/modal/SelectCategoryModal';
import SelectTimeModal from '../../components/common/modal/SelectTimeModal';
import MemoModal from '../../components/common/modal/MemoModal';
import { useAddTodo, useGetTodos } from '../../hooks/queries/useTodo';
import TITLES from '../../constants/title';
import DeleteModal from '../../components/common/modal/DeleteModal';
import { Link } from 'react-router-dom';

const FaPlus = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaPlus })));
const MdNavigateBefore = lazy(() =>
  import('react-icons/md').then(mod => ({ default: mod.MdNavigateBefore }))
);
const MdNavigateNext = lazy(() =>
  import('react-icons/md').then(mod => ({ default: mod.MdNavigateNext }))
);

export default function Todo() {
  const [isToday, setIsToday] = useState(true);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [idForDelete, setIdForDelete] = useState(0);
  const [now, setNow] = useState(new Date());
  const [openModal, setOpenModal] = useState({
    isCategoryModalOpen: false,
    isTimeModalOpen: false,
    isMemoModalOpen: false,
    isDeleteModalOpen: false,
  });
  const [inputs, setInputs] = useState<Omit<TodoItem, 'id' | 'is_completed'>>({
    title: '',
    category_id: 0,
    memo: '',
    start_date: '',
    end_date: '',
  });

  const token = localStorage.getItem('@token');
  const user = JSON.parse(localStorage.getItem('@user')!);

  const { data: todoList, refetch } = useGetTodos({
    target: isToday ? 'today' : 'yesterday',
    userId: user?.id,
  });

  const { mutate: addTodo } = useAddTodo();

  useEffect(() => {
    if (todoList) {
      setTodos(todoList);
    }
  }, [todoList]);

  useEffect(() => {
    if (isToday) setIsAdding(false);

    refetch();
  }, [isToday]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getDate() {
    const splited = now.toISOString().split('T');
    const date = splited[0];
    const time =
      splited[1].split(':').slice(0, 2).join(':') + ':' + splited[1].split(':')[2].slice(0, 2);

    return `${date} ${time}`;
  }

  const addNewTodo = () => {
    if (inputs.title && inputs.start_date) {
      const newTodo = {
        category_id: inputs.category_id || null,
        title: inputs.title,
        start_date: inputs.start_date,
        end_date: inputs.end_date,
        memo: inputs.memo ? inputs.memo.substring(0, 255) : '',
        user_id: user?.id,
      };
      if (token) {
        addTodo(newTodo);
      } else {
        if (todos.length < 3) {
          setTodos([
            ...todos,
            {
              ...newTodo,
              id: todos.length + 1,
              is_completed: false,
              category_id: inputs.category_id || undefined,
            },
          ]);
        } else {
          alert('비로그인 상태에서는 최대 3개의 투두만 추가할 수 있습니다.');
          return;
        }
      }
      setIsAdding(false);
      initialize();
    }
  };

  const initialize = () => {
    setInputs({
      title: '',
      category_id: 0,
      memo: '',
      start_date: '',
      end_date: '',
    });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title_box}>
          <div
            className={style.title}
            role='navigation'
            aria-label='네비게이션 바'
          >
            <button
              className={style.nav_btn}
              onClick={() => setIsToday(false)}
              style={{ cursor: isToday ? 'pointer' : 'default' }}
              aria-label='어제의 투두 보기'
            >
              <MdNavigateBefore
                size={25}
                color={isToday ? 'black' : '#c1c1c1'}
              />
            </button>
            {TITLES[+isToday]}
            <button
              className={style.nav_btn}
              onClick={() => setIsToday(true)}
              style={{ cursor: isToday ? 'default' : 'pointer' }}
              aria-label='오늘의 투두 보기'
            >
              <MdNavigateNext
                size={25}
                color={isToday ? '#c1c1c1' : 'black'}
              />
            </button>
          </div>
          <div className={style.now}>{getDate()}</div>
        </div>
      </div>
      {(token || (!token && isToday)) && (
        <div
          className={style.todo_card_wrp}
          style={{ marginBottom: !token && isToday ? '0' : '16px' }}
        >
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              data={todo}
              onRefetch={() => refetch()}
              openDeleteModal={() => setOpenModal({ ...openModal, isDeleteModalOpen: true })}
              onSetId={(id: number) => setIdForDelete(id)}
            />
          ))}
        </div>
      )}
      {!token && todos.length === 3 && isToday && (
        <p className={style.more_adding_guide}>
          더 많은 투두를 추가하려면 ,<br />
          <Link
            to='/login'
            style={{ textDecoration: 'none', fontWeight: '600' }}
          >
            로그인
          </Link>
          을 해보세요!
        </p>
      )}
      {isToday && isAdding && (
        <AddTodoCard
          inputs={inputs}
          onSetInputs={setInputs}
          openCategoryModal={() => setOpenModal({ ...openModal, isCategoryModalOpen: true })}
          openTimeModal={() => setOpenModal({ ...openModal, isTimeModalOpen: true })}
          openMemoModal={() => setOpenModal({ ...openModal, isMemoModalOpen: true })}
        />
      )}
      {!todos.length && !isAdding && (
        <div className={style.no_data}>
          <p className={style.no_todos_text}>추가된 투두가 없습니다.</p>
        </div>
      )}
      {isToday && isAdding && (
        <div className={style.button_grp}>
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
            . 투두 추가하기
          </button>
        </div>
      )}
      {isToday && !isAdding && (token || (isToday && todos.length < 3)) && (
        <button
          className={style.add_todo_float}
          onClick={() => setIsAdding(true)}
          aria-label='투두 추가하기'
        >
          <FaPlus
            color='#FAFAFA'
            size={22}
          />
        </button>
      )}
      {openModal.isCategoryModalOpen && (
        <SelectCategoryModal
          isOpen={openModal.isCategoryModalOpen}
          onClose={() => setOpenModal({ ...openModal, isCategoryModalOpen: false })}
          onSetCategory={category_id => setInputs({ ...inputs, category_id: category_id })}
        />
      )}
      {openModal.isTimeModalOpen && (
        <SelectTimeModal
          isOpen={openModal.isTimeModalOpen}
          onClose={() => setOpenModal({ ...openModal, isTimeModalOpen: false })}
          onSetTime={times =>
            setInputs({ ...inputs, start_date: times.start, end_date: times.end })
          }
          data={{
            startTime: inputs.start_date,
            endTime: inputs.end_date,
          }}
          current={+isToday}
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
      {openModal.isDeleteModalOpen && (
        <DeleteModal
          isOpen={openModal.isDeleteModalOpen}
          onClose={() => setOpenModal({ ...openModal, isDeleteModalOpen: false })}
          id={idForDelete}
        />
      )}
    </div>
  );
}
