import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Viberty Network User Manager | Viberty Network Dashboard",
  description:
    "This is Viberty Network User Manager",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="User Manager" />
      <div className="space-y-6">
        <ComponentCard title="User Manager">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
