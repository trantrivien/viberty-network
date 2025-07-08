'use client';

import Badge from '@/components/ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import Button from '@/components/ui/button/Button';
import { get } from '@/lib/api/request';

import toast from 'react-hot-toast';
import { getImageUrl } from '@/utils/helpers';
import { deleteItem, getAllItems } from '@/lib/services/itemsService';
import { Item } from '@/types/item';

export default function ItemsManager() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [listItems, setListItems] = useState<Item[]>([]);
    const closeModal = () => {
        setIsOpen(false);
    };

    const getListItems = async () => {
        const result = await getAllItems();
        console.log(result);
        setListItems(result);
    };

    useEffect(() => {
        getListItems();
    }, []);

    const handleDeleteItems = async (itemId?: number) => {
        try {
            const result = await deleteItem(itemId);
            toast.success(result.message ?? '');
            getListItems();
        } catch (error) {
            toast.error('something went wrong try again');
        }
    };

    const handleConfirmDelete = (itemId?: number) => {
        toast((t) => (
            <div>
                Are you sure <b>Delete this task</b>
                <div className="flex gap-2 my-2">
                    <Button
                        onClick={() => {
                            toast.dismiss(t.id);
                            handleDeleteItems(itemId);
                        }}
                    >
                        Yes
                    </Button>
                    <Button variant="outline" onClick={() => toast.dismiss(t.id)}>
                        No
                    </Button>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <Button className="mb-4" onClick={() => setIsOpen(true)}>
                Create Items
            </Button>
            {/* <AddItems reloadItemss={getListItems} selectedItems="" isOpen={isOpen} closeModal={closeModal} /> */}
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
                                        Reward
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Item Price
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
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {listItems?.map((item: Item) => (
                                    <TableRow key={item.item_id}>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-sm">
                                                    <Image
                                                        width={40}
                                                        height={40}
                                                        
                                                        src={
                                                            item.image_url
                                                                ? getImageUrl(item.image_url)
                                                                : '/images/user/logo.png'
                                                        }
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.description ?? '---'}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase">
                                            {item.type}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.mining_speed_boost}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.price}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {(new Date(item.created_at)).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell className="px-4 gap-2 flex py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <Button>Edit</Button>
                                            <Button
                                                onClick={() => handleConfirmDelete(item.item_id)}
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
