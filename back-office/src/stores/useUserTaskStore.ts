import { create } from 'zustand';
import { UserTask } from '@/types';

type UserTaskStore = {
  userTasks: UserTask[];
  setUserTasks: (userTasks: UserTask[]) => void;
};

export const useUserTaskStore = create<UserTaskStore>((set) => ({
  userTasks: [],
  setUserTasks: (userTasks) => set({ userTasks }),
}));
