import React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { get_btech_stats } from '@/app/actions/b_tech/b_tech';
import ErrorHandler from '@/components/custom/ErrorHandler';
import StatsTable from '@/components/custom/StatsTable';
import { StatsFormProps } from '@/db/models/btech.model';
import LinkButton from '@/components/custom/LinkButton';

const page = async () => {
  let stats: StatsFormProps[] = [];
  try {
    stats = JSON.parse(JSON.stringify(await get_btech_stats()));
  } catch (error) {
    return (
      <ErrorHandler
        message={(error as Error).message || 'Something went Wrong!'}
      />
    );
  }
  return (
    <div className="flex flex-col px-6">
      <div className="text-white flex justify-between mt-4">
        <h1 className="text-2xl font-semibold">B.Tech Statistics</h1>
        <LinkButton route="/btech_statistics/add_new"></LinkButton>
      </div>
      <StatsTable isBtech={true} stats={stats}></StatsTable>
    </div>
  );
};

export default page;
