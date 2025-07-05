import DatePicker from '@/components/form/date-picker';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileInput from '@/components/form/input/FileInput';
import TextArea from '@/components/form/input/TextArea';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { createTask } from '@/lib/services/tasksService';
import { uploadImage } from '@/lib/services/upload';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useUserStore } from '@/stores/useUserStore';
import { Task } from '@/types';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface IAddTaskProps {
    selectedTask: string;
    isOpen: boolean;
    closeModal: () => void;
    reloadTasks: () =>  void;
}

export type TaskType = 'like_video' | 'subscribe_youtube' | 'follow_x' | 'other';

export interface TaskForm {
    title: string;
    description?: string;
    rewardAmount: number;
    type: TaskType;
    externalLink?: string;
    imageFile?: File;
}

export default function AddTask({ selectedTask, closeModal, isOpen , reloadTasks}: IAddTaskProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<any>();
    const setLoading = useLoadingStore((state) => state.setLoading);
    const user = useUserStore((state) => state.user);

    const [taskForm, setTaskForm] = useState<Task>({} as Task);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };



    const handleSubmit = async () => {
      setLoading(true);
      try {
        let imageUrl = '';
    
        if (imageFile) {
          const result = await uploadImage(imageFile);
          imageUrl = result.imageUrl;
        }
    
        const payload: Task = {
          title: taskForm.title,
          description: taskForm.description,
          type: taskForm.type,
          reward: taskForm.reward,
          reward_type: taskForm.reward_type,
          image_url: imageUrl,
          created_by: user?.user_id as number,
        };
    
        await createTask(payload);
      
        toast.success('Task created!')
        closeModal();
        reloadTasks()
      } catch (err) {
        console.error(err);
        toast.error('Error creating task!');
      } finally {
        setLoading(false);
      }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]  p-6 lg:p-10">
                <div className="flex flex-col px-2 overflow-y-auto  max-h-[80vh]   custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            {selectedTask ? 'Edit Task' : 'Add Task'}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create Daily Task</p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Name
                                </label>
                                <input
                                    id="task-title"
                                    type="text"
                                    value={taskForm.title}
                                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                                Desciption
                            </label>
                            <div className="flex flex-wrap items-center gap-4 w-full sm:gap-5">
                                <TextArea
                                    className="w-full"
                                    value={taskForm.description ?? ''}
                                    onChange={(value) => setTaskForm({ ...taskForm, description: value })}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                                Reward Amount
                            </label>
                            <div className="flex flex-wrap items-center gap-4 w-full sm:gap-5">
                                <input
                                    id="event-title"
                                    type="number"
                                    value={taskForm.reward}
                                    onChange={(e) => setTaskForm({ ...taskForm, reward: parseFloat(e.target.value) })}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">
                                Reward Type
                            </label>
                            <select
                                value={taskForm.reward_type}
                                onChange={(e) => setTaskForm({ ...taskForm, reward_type: e.target.value as any })}
                                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            >
                                <option value="money">Money</option>
                                <option value="mining_speed">Mining Speed</option>
                            </select>
                        </div>
                        <div className="mt-6">
                            <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-400">
                                Task Type
                            </label>
                            <select
                                value={taskForm.type}
                                onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value as any })}
                                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            >
                                <option value="fixed">Fixed</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </div>
                        <div className="mt-6">
                            <div className="relative">
                                <DatePicker
                                    id="date-picker"
                                    label="Enter End Date"
                                    placeholder="Select a date"
                                    onChange={(dates:any, currentDateString:any) => {
                                        setTaskForm({ ...taskForm, end_date: dates as any })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <FileInput onChange={handleFileChange} className="custom-class" />
                                {previewImage && (
                                    <div className="mt-4">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="rounded-md max-h-32 border border-gray-300 dark:border-gray-700"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            {selectedTask ? 'Update Changes' : 'Add Task'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
