// src/stores/useTasksStore.ts
import create from 'zustand';
 // Adjust the import path as needed
import axios from 'axios';
import { Base_Url } from '../config/api.config';
import { Task } from '../components/forground/Foreground';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => void;
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${Base_Url}/task/pending`, {}, {
        withCredentials: true,
      });
      set({ tasks: response.data, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch tasks', loading: false });
      console.error(err);
    }
  },
  setTasks: (tasks: Task[]) => set({ tasks }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));

export default useTasksStore;
