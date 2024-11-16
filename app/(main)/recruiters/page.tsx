import RecruitersTable from '@/components/custom/RecruitersTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RecruitersProps } from '@/db/models/recruiters.model';
import React from 'react';
import ErrorHandler from '@/components/custom/ErrorHandler';
import { get_recruiters } from '@/app/actions/recruiters/recruiters';
import LinkButton from '@/components/custom/LinkButton';

const page = async () => {
  let recruiters: RecruitersProps[] = [];
  try {
    recruiters = JSON.parse(JSON.stringify(await get_recruiters()));
  } catch (error) {
    return (
      <ErrorHandler
        message={(error as Error).message || 'Something went Wrong!'}
      ></ErrorHandler>
    );
  }
  return (
    <div className="flex flex-col px-6">
      <div className="text-white flex justify-between mt-4">
        <h1 className="text-2xl font-semibold">Recruiters</h1>
        <LinkButton route="/recruiters/add_new"></LinkButton>
      </div>
      <RecruitersTable recruiters={recruiters}></RecruitersTable>
    </div>
  );
};

export default page;
