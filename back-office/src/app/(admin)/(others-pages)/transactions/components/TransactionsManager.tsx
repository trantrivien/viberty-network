'use client';

import ComponentCard from '@/components/common/ComponentCard';
import FilterTabTable from '@/components/common/FilterTable';
import Button from '@/components/ui/button/Button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { deleteTask, getAllTasks } from '@/lib/services/tasksService';
import { getAllTransactions } from '@/lib/services/transactionsService';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { Task, Transaction } from '@/types';
import { getImageUrl } from '@/utils/helpers';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function TransactionsManager() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [listTransaction, setListTransaction] = useState<Transaction[]>([]);
    const meta = useTransactionStore((state) => state.meta);
    const setMeta = useTransactionStore((state) => state.setMeta);

    const [page, setPage] = useState(1);
    const limit = 10;

    const closeModal = () => {
        setIsOpen(false);
    };

    const getListTransaction = async (pageNum: number) => {
        const result = await getAllTransactions({ page: pageNum, limit });
        setListTransaction(result.data);
        setMeta(result.meta);
    };

    useEffect(() => {
        getListTransaction(page);
    }, []);

    return (
        <ComponentCard title="Transactions Manager" extraSection={<FilterTabTable />
    }>
                            
            <div>

                {/* <AddTask reloadTasks={getListTask} selectedTask="" isOpen={isOpen} closeModal={closeModal} /> */}
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
                                            ID
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
                                            From Username
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            To Username
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Amount
                                        </TableCell>
                                        <TableCell
                                            isHeader
                                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                        >
                                            Created At
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {listTransaction.map((transaction: Transaction) => (
                                        <TableRow key={transaction.transaction_id}>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {transaction.transaction_id}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {transaction.description ?? '---'}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {transaction.type ?? '---'}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {transaction.from_username ?? '---'}
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {transaction.to_username ?? '---'}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {transaction.amount ?? '---'}
                                            </TableCell>
                                            <TableCell className="px-4 gap-2 flex py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {transaction.created_at ?? '---'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    {/* Pagination */}
                    {meta && (
                        <div className="flex justify-between items-center p-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Page {meta.page} of {meta.totalPages}
                            </span>
                            <div className="space-x-2">
                                <Button
                                    size="sm"
                                    disabled={meta.page <= 1}
                                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                >
                                    Previous
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={meta.page >= meta.totalPages}
                                    onClick={() => setPage((prev) => Math.min(meta.totalPages, prev + 1))}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ComponentCard>
    );
}
