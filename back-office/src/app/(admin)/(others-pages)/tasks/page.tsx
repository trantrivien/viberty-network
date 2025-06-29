import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import BasicTableOne from '@/components/tables/BasicTableOne'
import React from 'react'
import ListTask from './components/ListTask'
import { Metadata } from 'next'
import Button from '@/components/ui/button/Button'
import AddTask from './components/AddTask'
export const metadata: Metadata = {
  title: "Viberty Network Task | Viberty Network Dashboard",
  description:
    "This is Viberty Network Task page",
};
export default function Tasks() {
  return (
    <div> 
    <PageBreadcrumb pageTitle="Task" />
    <div className="space-y-6">
   
      <ComponentCard title="List Task" >
        <ListTask />
      </ComponentCard>
    </div>
  </div>
  )
}
