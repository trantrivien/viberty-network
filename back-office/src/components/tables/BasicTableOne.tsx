'use client'

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableHeader, TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";
import { getAllUsers } from "@/lib/services/userService";
import Button from "../ui/button/Button";
import { getImageUrl } from "@/utils/helpers";

export default function BasicTableOne() {
  const listUser = useUserStore((state) => state.listUser);
  const setListUser = useUserStore((state) => state.setListUser);
  const meta = useUserStore((state) => state.meta);
  const setMeta = useUserStore((state) => state.setMeta);

  const [page, setPage] = useState(1);
  const limit = 10;

  const handleFetchListUser = async (pageNum = 1) => {
    try {
      const result = await getAllUsers({ page: pageNum, limit });
      setListUser(result.data);
      setMeta(result.meta);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleFetchListUser(page);
  }, [page]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                User Name
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                  Balance
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                  Mining Status
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                Email
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                Phone
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                wallet
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {listUser?.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={user.image_url? getImageUrl(user.image_url) :'/images/user/logo.png'}
                          alt={user.username ?? ''}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.username}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {user.amount}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                      size="sm"
                      color={
                        user.is_mining
                          ? "success" : "warning"
                   
                      }
                    >
                      {user.is_mining? "Active" : "Stopped"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {user.email ?? '--'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {user.phone ?? '--'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  
                  <Badge
                      size="sm"
                      color={
                        user.is_banned
                          ? "error" : "success"
                   
                      }
                    >
                      {user.is_banned ? "Banned" :'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {user.wallet_address}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <div>
                      <Button>Actions</Button>
                    </div>
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
  );
}
