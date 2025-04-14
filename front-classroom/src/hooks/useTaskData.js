import { useState, useEffect } from 'react';
import { getTaskById} from '../services/apiGet';

export function useTaskData(taskId) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const taskData = await getTaskById(taskId);
        setTask(taskData);
      } catch (error) {
        console.error('Error fetching task data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [taskId]);

  return {
    task,
    loading,
    error
  };
}