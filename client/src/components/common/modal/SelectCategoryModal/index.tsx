import { KeyboardEventHandler, useEffect, useState } from 'react';
import Modal, { ModalProps } from '../index';
import Input from '../../Input';
import { MdOutlineDelete, MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import style from './index.module.css';

interface SelectCategoryModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  onSetCategory: (value: string) => void;
}

export default function SelectCategoryModal({
  isOpen,
  onClose,
  onSetCategory,
}: SelectCategoryModalProps) {
  const [selected, setSelected] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const categories = ['일상', '루틴', '공부'];
  const [addedCategories, setAddedCategories] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) setSelected('');
  }, [isDeleting]);

  useEffect(() => {
    if (!addedCategories.length) setIsDeleting(false);
  }, [addedCategories]);

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (
        newCategory.trim() !== '' &&
        !addedCategories.includes(newCategory) &&
        addedCategories.length < 6
      ) {
        setAddedCategories([...addedCategories, newCategory]);
        setNewCategory('');
      }
    }
  };

  const deletetCategory = (category: string) => {
    const newArray = addedCategories.filter(el => el !== category);
    setAddedCategories(newArray);
  };

  const submitHandler = () => {
    if (selected) {
      onSetCategory(selected);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle='카테고리 선택'
      height='400px'
    >
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', marginTop: '16px' }}>카테고리</span>
          <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
            {categories.map(category => (
              <button
                key={category}
                className={style.chip}
                style={{
                  color: selected === category ? '#ff8787' : '#7c7c7c',
                  border: selected === category ? '1px solid #ff8787' : '1px solid #7c7c7c',
                }}
                onClick={() => setSelected(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px' }}>새로 추가하기 (최대 6개)</span>
            {isDeleting ? (
              <button onClick={() => setIsDeleting(false)}>
                <FaCheck
                  size={17}
                  color={'#15b72b'}
                />
              </button>
            ) : (
              <button
                onMouseEnter={e => (e.currentTarget.style.color = '#222')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7c7c7c')}
                onClick={() => setIsDeleting(true)}
              >
                <MdOutlineDelete size={17} />
              </button>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <Input
              value={newCategory}
              onSetValue={setNewCategory}
              className={style.input}
              onKeyDown={keyDownHandler}
              maxLength={10}
            />
            <span className={style.input_length}>{newCategory.length} / 10</span>
          </div>
          <div className={style.adding_new_chips}>
            {addedCategories.map(category => (
              <button
                key={category}
                className={
                  isDeleting
                    ? `${style.chip} ${style.added_chip} ${style.wiggle}`
                    : `${style.chip} ${style.added_chip}`
                }
                style={{
                  border: selected === category ? '1px solid #ff8787' : '1px solid #9e9e9e',
                  color: selected === category ? '#ff8787' : '#7c7c7c',
                }}
                onClick={() => (isDeleting ? deletetCategory(category) : setSelected(category))}
              >
                <span>{category}</span>
                {isDeleting && (
                  <span className={style.delete_text}>
                    <MdClose />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className={style.submit_box}>
          <button
            className={style.submit_btn}
            onClick={submitHandler}
          >
            선택하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
