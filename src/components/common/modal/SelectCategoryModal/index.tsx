/* eslint-disable react-refresh/only-export-components */
import { KeyboardEventHandler, useEffect, useState } from 'react';
import Modal, { ModalProps } from '../index';
import Input from '../../Input';
import { MdOutlineDelete, MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import style from './index.module.css';
import {
  useAddCategory,
  useCategories,
  useDeleteCategory,
} from '../../../../hooks/queries/useCategory';
import { CategoryItem } from '../../../../types/types';
import { HexColorPicker } from 'react-colorful';

export const categoriesWithoutToken = [
  {
    id: 1,
    name: '일상',
    color: '#ff8787',
  },
  {
    id: 2,
    name: '학교',
    color: '#8bb2ec',
  },
  {
    id: 3,
    name: '작업',
    color: '#02c75a',
  },
];

interface SelectCategoryModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  onSetCategory: (value: number) => void;
}

export default function SelectCategoryModal({
  isOpen,
  onClose,
  onSetCategory,
}: SelectCategoryModalProps) {
  const [selected, setSelected] = useState('');
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [color, setColor] = useState('#ff8787');
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const { data } = useCategories();
  const { mutate: addCategory } = useAddCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const token = localStorage.getItem('@token');

  useEffect(() => {
    if (data && data.success) {
      setCategories(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (!token) {
      setCategories(categoriesWithoutToken);
    }
  }, []);

  useEffect(() => {
    if (isDeleting) setSelected('');
  }, [isDeleting]);

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (newCategory.trim() !== '' && newCategory) {
        if (token) {
          addCategory({
            name: newCategory,
            color,
          });
        } else {
          setCategories([
            ...categories,
            {
              id: categories.length + 1,
              name: newCategory,
              color,
            },
          ]);
        }
        setNewCategory('');
        setColor('#ff8787');
      }
    }
  };

  const deletetCategory = (category: string) => {
    if (token) {
      deleteCategory({ name: category });
    } else {
      setCategories(categories.filter(el => el.name !== category));
    }
  };

  const submitHandler = () => {
    if (selected) {
      let id = 0;
      categories.forEach(category => {
        if (category.name === selected) {
          id = category.id;
        }
      });
      onSetCategory(id);
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
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', marginTop: '16px' }}>기본 카테고리</span>
        </div> */}
        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column' }}>
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
            {openColorPicker ? (
              <HexColorPicker
                color={color}
                onChange={setColor}
                style={{
                  zIndex: 1,
                  position: 'absolute',
                  right: 0,
                  width: '100px',
                  height: '100px',
                }}
                onBlur={() => setOpenColorPicker(false)}
              />
            ) : (
              <button
                className={style.select_color}
                style={{ backgroundColor: color }}
                onClick={() => setOpenColorPicker(true)}
              />
            )}
          </div>
          <div className={style.adding_new_chips}>
            {categories.map(category => (
              <button
                key={category.name}
                className={
                  isDeleting
                    ? `${style.chip} ${style.added_chip} ${style.wiggle}`
                    : `${style.chip} ${style.added_chip}`
                }
                style={{
                  border: selected === category.name ? '1px solid #ff8787' : '1px solid #9e9e9e',
                  color: selected === category.name ? '#ff8787' : '#7c7c7c',
                }}
                onClick={() =>
                  isDeleting ? deletetCategory(category.name) : setSelected(category.name)
                }
              >
                <span>{category.name}</span>
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
