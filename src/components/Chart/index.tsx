import { PieChart, Cell, Pie, Legend, ResponsiveContainer } from 'recharts';
import { useCategories } from '../../hooks/queries/useCategory';
import { useEffect, useState } from 'react';
import { useGetTodos } from '../../hooks/queries/useTodo';
import { CategoryItem, TodoItem } from '../../types/types';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Chart = () => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const user = JSON.parse(localStorage.getItem('@user')!);

  const { data: categories } = useCategories();
  const { data: todos } = useGetTodos({ target: 'today', userId: user?.id });
  const todoCount = todos?.data?.filter((el: TodoItem) => el.category_id);

  useEffect(() => {
    if (categories?.data && todos?.data) {
      const db = new Map();

      todoCount.forEach((item: TodoItem) => {
        const category = categories?.data?.filter((el: CategoryItem) => el.id === item.category_id);
        if (category && category.length > 0) {
          const categoryData = category[0];
          db.set(categoryData.name, (db.get(categoryData.name) || 0) + 1);
        }
      });
      const newChartData = Array.from(db.entries()).map(([key, value]) => ({
        name: key,
        value: value,
      }));

      setChartData(newChartData);
    }
  }, [categories, todos]);

  return (
    <ResponsiveContainer
      width={330}
      height={170}
      className='text-center'
      style={{ pointerEvents: 'none' }}
    >
      <PieChart>
        <Legend
          layout='vertical'
          verticalAlign='middle'
          align='left'
          wrapperStyle={{ paddingRight: '10px' }}
        />
        <Pie
          data={chartData}
          cx='45%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          style={{ outline: 'none' }}
        >
          {chartData.map(el => (
            <Cell
              key={el.name + el.value}
              style={{ outline: 'none' }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
