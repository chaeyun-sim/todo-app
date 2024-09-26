import { PieChart, Cell, Pie, Legend, ResponsiveContainer } from 'recharts';
import { useGetTodoCountByCategory } from '../../hooks/queries/useCategory';
import { useEffect, useState } from 'react';

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

type ChartItem = {
  name: string;
  count: number;
  id: number;
  color: string;
};

const Chart = () => {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const { data: todoCount } = useGetTodoCountByCategory();

  useEffect(() => {
    if (todoCount?.data) {
      setChartData(
        todoCount.data?.map((el: ChartItem) => {
          return {
            name: el.name,
            value: el.count,
          };
        })
      );

      setColors(todoCount?.data.map((el: ChartItem) => el.color));
    }
  }, [todoCount]);

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
          {chartData.map((el, index) => (
            <Cell
              key={el.name + el.value}
              fill={colors[index % colors.length]}
              style={{ outline: 'none' }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
