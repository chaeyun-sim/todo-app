import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useAddReminder = () => {
  return useMutation({
    mutationFn: async ({
      todo_id,
      reminder_time,
      message,
    }: {
      todo_id: number;
      reminder_time: string;
      message: '';
    }) => {
      const result = await axios.post('/reminder', {
        todo_id,
        reminder_time,
        message,
      });
      return result.data;
    },
  });
};

export { useAddReminder };
