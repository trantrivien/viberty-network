'use client';

import Badge from '@/components/ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import Button from '@/components/ui/button/Button';
import AddTask from './AddTask';
import { get } from '@/lib/api/request';
import { deleteTask, getAllTasks } from '@/lib/services/tasksService';
import { Task } from '@/types';
import toast from 'react-hot-toast';
import { getImageUrl } from '@/utils/helpers';

interface Order {
    id: number;
    user: {
        image: string;
        name: string;
        role: string;
    };
    projectName: string;
    team: {
        images: string[];
    };
    status: string;
    budget: string;
}

export default function ListTask() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [listTask, setListTask] = useState<Task[]>([]);
    const closeModal = () => {
        setIsOpen(false);
    };

    const getListTask = async () => {
        const result = await getAllTasks();
        setListTask(result);
    };

    useEffect(() => {
        getListTask();
    }, []);

    const handleDeleteTask = async (taskId?: number) => {
        try {
            const result = await deleteTask(taskId);
            toast.success(result.message ?? '');
            getListTask();
        } catch (error) {
            toast.error('something went wrong try again');
        }
    };

    const handleConfirmDelete = (taskId?: number) => {
        toast((t) => (
            <div>
                Are you sure <b>Delete this task</b>
                <div className="flex gap-2 my-2">
                    <Button
                        onClick={() => {
                            toast.dismiss(t.id);
                            handleDeleteTask(taskId);
                        }}
                    >
                        Yes
                    </Button>
                    <Button variant='outline' onClick={() => toast.dismiss(t.id)}>No</Button>
                </div>
            </div>
        ));
    };

    console.log(getImageUrl('sdfasdfsa'))
    return (
        <div>
            <Button className="mb-4" onClick={() => setIsOpen(true)}>
                Create Task
            </Button>
            <AddTask reloadTasks={getListTask} selectedTask="" isOpen={isOpen} closeModal={closeModal} />
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            {/* Table Header */}

                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Type
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Reward Amount
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Reward Type
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Created At
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Edit
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {listTask.map((task: Task) => (
                                    <TableRow key={task.task_id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-full">
                                                    <Image
                                                        width={40}
                                                        height={40}
                                                        src={task.image_url ? getImageUrl(task.image_url) : '/images/user/logo.png'}
                                                        alt={task.title}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {task.title}
                                                    </span>
                                                    {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                                        {order.user.role}
                                                    </span> */}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {task.description ?? '---'}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex -space-x-2">
                                                {/* {order.team.images.map((teamImage, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                                                    >
                                                        <Image
                                                            width={24}
                                                            height={24}
                                                            src={teamImage}
                                                            alt={`Team member ${index + 1}`}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                ))} */}
                                                {task.type}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {task.reward}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {task.reward_type}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {task.created_at}
                                        </TableCell>
                                        <TableCell className="px-4 gap-2 flex py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <Button>Edit</Button>
                                            <Button
                                                onClick={() => handleConfirmDelete(task.task_id)}
                                                className="bg-red-500"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
