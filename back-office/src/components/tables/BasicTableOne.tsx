'use client'
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Image from "next/image";
import { useUserItemStore } from "@/stores/useUserItemStore";
import { useUserStore } from "@/stores/useUserStore";
import { getAllUsers } from "@/lib/services/userService";

export default function BasicTableOne() {

    const listUser = useUserStore(state => state.listUser)
    const setListUser = useUserStore(state => state.setListUser)



    const handleFetchListUser = async () => {
      const result = await getAllUsers()
      setListUser(result)
    }
useEffect(()=>{
  handleFetchListUser()
},[])
  return (
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
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Project Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Team
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Budget
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {listUser.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={'/images/user/logo.png'}
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
             
                  {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.status === "Active"
                          ? "success"
                          : user.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
