import TodoCard from '../../components/TodoCard';
import style from './index.module.css';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import AddTodoCard from '../../components/AddTodoCard';
import { TodoItem } from '../../types/types';
import SelectCategoryModal from '../../components/common/modal/SelectCategoryModal';
import SelectTimeModal from '../../components/common/modal/SelectTimeModal';
import MemoModal from '../../components/common/modal/MemoModal';
import { useAddTodo, useGetTodos } from '../../hooks/queries/useTodo';
import TITLES from '../../constants/title';
import DeleteModal from '../../components/common/modal/DeleteModal';
import { Link } from 'react-router-dom';

export default function Todo() {
  const [current, setCurrent] = useState(0);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
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
  const [idForDelete, setIdForDelete] = useState(0);

  const { data: todoList, refetch } = useGetTodos({ target: TITLES[current].toLowerCase() });
  const { mutate: addTodo } = useAddTodo();
  const token = localStorage.getItem('@token');
  const user = JSON.parse(localStorage.getItem('@user')!);

  useEffect(() => {
    if (todoList && todoList.data) {
      setTodos(todoList.data);
    }
  }, [todoList]);

  useEffect(() => {
    if (current === -1) setIsAdding(false);

    refetch();
  }, [current]);

  const addNewTodo = () => {
    if (inputs.title && inputs.start_date) {
      const newTodo = {
        category_id: inputs.category_id || 0,
        title: inputs.title,
        start_date: inputs.start_date,
        end_date: inputs.end_date,
        memo: inputs.memo ? inputs.memo.substring(0, 255) : '',
        user_id: user.id,
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
          <div className={style.title}>
            <button
              className={style.nav_btn}
              onClick={() => (current === -1 ? null : setCurrent(current - 1))}
              style={{ cursor: current > -1 ? 'pointer' : 'default' }}
            >
              <MdNavigateBefore
                size={25}
                color={current === -1 ? '#c1c1c1' : 'black'}
              />
            </button>
            {TITLES[current]}
            <button
              className={style.nav_btn}
              onClick={() => (current === 1 ? null : setCurrent(current + 1))}
              style={{ cursor: current < 1 ? 'pointer' : 'default' }}
            >
              <MdNavigateNext
                size={25}
                color={current === 1 ? '#c1c1c1' : 'black'}
              />
            </button>
          </div>
        </div>
      </div>
      {(token || (!token && current === 0)) && (
        <div
          className={style.todo_card_wrp}
          style={{ marginBottom: !token && current === 0 ? '0' : '16px' }}
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
      {!token && todos.length === 3 && current === 0 && (
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
        <div className={style.no_data}>
          <h1>No Todos</h1>
        </div>
      )}
      {current > -1 && isAdding && (
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
            투두 추가하기
          </button>
        </div>
      )}
      {current > -1 && !isAdding && (token || (current !== 1 && todos.length < 3)) && (
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
          current={current}
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
