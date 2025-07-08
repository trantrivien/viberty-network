import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import BasicTableOne from '@/components/tables/BasicTableOne';
import React from 'react';
import { Metadata } from 'next';
import Button from '@/components/ui/button/Button';
import ItemsManager from './components/ItemsManager';

export const metadata: Metadata = {
    title: 'Viberty Network Items Manager | Viberty Network Dashboard',
    description: 'This is Viberty Network Items Manager page',
};

export default function ItemsMangager() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Items Manager" />
            <div className="space-y-6">
                <ComponentCard title="Items Manager">
                    <ItemsManager />
                </ComponentCard>
            </div>
        </div>
    );
}
