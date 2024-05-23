// useUserStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface TaskState {
  userId: number;
  taskTitle:string;
  taskDescription: string;
  status:string;
  startTime:string;
  endTime:string;
};

export type TaskListState = TaskState[];

type TaskListStore = {
  tasks: TaskListState | null;
  loading: boolean;
  error: string | null;
  setTasks: (tasks: TaskListState) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

const useTaskListStore = create<TaskListStore>()(
  devtools(
    (set) => ({
      tasks: null,
      loading: false,
      error: null,
      setTasks: (tasks) => set({ tasks }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    { name: "TaskStore" }
  )
);

export default useTaskListStore;
