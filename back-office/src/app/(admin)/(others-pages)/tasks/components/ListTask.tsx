'use client';

import Badge from '@/components/ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import Button from '@/components/ui/button/Button';
import AddTask from './AddTask';
import { get } from '@/lib/api/request';

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

// Define the table data using the interface
const tableData: Order[] = [
    {
        id: 1,
        user: {
            image: '/images/user/user-17.jpg',
            name: 'Lindsey Curtis',
            role: 'Web Designer',
        },
        projectName: 'Agency Website',
        team: {
            images: ['/images/user/user-22.jpg', '/images/user/user-23.jpg', '/images/user/user-24.jpg'],
        },
        budget: '3.9K',
        status: 'Active',
    },
    {
        id: 2,
        user: {
            image: '/images/user/user-18.jpg',
            name: 'Kaiya George',
            role: 'Project Manager',
        },
        projectName: 'Technology',
        team: {
            images: ['/images/user/user-25.jpg', '/images/user/user-26.jpg'],
        },
        budget: '24.9K',
        status: 'Pending',
    },
    {
        id: 3,
        user: {
            image: '/images/user/user-17.jpg',
            name: 'Zain Geidt',
            role: 'Content Writing',
        },
        projectName: 'Blog Writing',
        team: {
            images: ['/images/user/user-27.jpg'],
        },
        budget: '12.7K',
        status: 'Active',
    },
    {
        id: 4,
        user: {
            image: '/images/user/user-20.jpg',
            name: 'Abram Schleifer',
            role: 'Digital Marketer',
        },
        projectName: 'Social Media',
        team: {
            images: ['/images/user/user-28.jpg', '/images/user/user-29.jpg', '/images/user/user-30.jpg'],
        },
        budget: '2.8K',
        status: 'Cancel',
    },
    {
        id: 5,
        user: {
            image: '/images/user/user-21.jpg',
            name: 'Carla George',
            role: 'Front-end Developer',
        },
        projectName: 'Website',
        team: {
            images: ['/images/user/user-31.jpg', '/images/user/user-32.jpg', '/images/user/user-33.jpg'],
        },
        budget: '4.5K',
        status: 'Active',
    },
];

export default function ListTask() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [listTask, setListTask] = useState([])
    const closeModal = () => {
        setIsOpen(false);
    };

    const getListTask =async () => {
        const result = await get('/tasks')
        setListTask(result.data)
  
    }

    useEffect(() => {getListTask()},[])
    return (
        <div>
            <Button className="mb-4" onClick={() => setIsOpen(true)}>
                Create Task
            </Button>
            <AddTask selectedTask="" isOpen={isOpen} closeModal={closeModal} />
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
                                {listTask.map((task:any) => (
                                    <TableRow key={task.id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-full">
                                                    {/* <Image
                                                        width={40}
                                                        height={40}
                                                        src={order.user.image}
                                                        alt={order.user.name}
                                                    /> */}
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
                                            {/* <Badge
                                                size="sm"
                                                color={
                                                    order.status === 'Active'
                                                        ? 'success'
                                                        : order.status === 'Pending'
                                                        ? 'warning'
                                                        : 'error'
                                                }
                                            >
                                                {order.status}
                                            </Badge> */}
                                            {task.reward_amount}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {task.created_at}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            Edit
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
