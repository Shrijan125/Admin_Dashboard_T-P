import { get_alumni } from '@/app/actions/alumni/alumni';
import AlumniTable from '@/components/custom/AlumniTable';
import ErrorHandler from '@/components/custom/ErrorHandler';
import LinkButton from '@/components/custom/LinkButton';
import { Button } from '@/components/ui/button';
import { AlumniProp } from '@/db/models/alumni.model';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  let alumni: AlumniProp[] = [];
  try {
    alumni = JSON.parse(JSON.stringify(await get_alumni()));
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
        <h1 className="text-2xl font-semibold">Alumni</h1>
        <LinkButton route="/alumni/add_new"></LinkButton>
      </div>
      <AlumniTable stats={alumni}></AlumniTable>
    </div>
  );
};

export default page;
