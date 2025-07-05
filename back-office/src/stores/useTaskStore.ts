import { create } from 'zustand';
import { Task } from '@/types';

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (task_id: number, status: Task['status']) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (task_id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.task_id === task_id ? { ...task, status } : task
      ),
    })),
}));
