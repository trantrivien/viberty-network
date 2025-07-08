import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import BasicTableOne from '@/components/tables/BasicTableOne';
import { Metadata } from 'next';
import React from 'react';
import TransactionsManager from './components/TransactionsManager';

export const metadata: Metadata = {
    title: 'Viberty Network Transactions Manager | Viberty Network Dashboard',
    description: 'This is Viberty Network Transactions Manager',
    // other metadata
};

export default function UserManager() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Transactions Manager" />
            <div className="space-y-6">
                <TransactionsManager />
            </div>
        </div>
    );
}
