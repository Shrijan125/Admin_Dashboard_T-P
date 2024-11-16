import { get_mtech_stats } from '@/app/actions/m_tech/m_tech';
import ErrorHandler from '@/components/custom/ErrorHandler';
import LinkButton from '@/components/custom/LinkButton';
import StatsTable from '@/components/custom/StatsTable';
import { Button } from '@/components/ui/button';
import { StatsFormProps } from '@/db/models/btech.model';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  let stats: StatsFormProps[] = [];
  try {
    stats = JSON.parse(JSON.stringify(await get_mtech_stats()));
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
        <h1 className="text-2xl font-semibold">M.Tech Statistics</h1>
        <LinkButton route="/mtech_statistics/add_new"></LinkButton>
      </div>
      <StatsTable stats={stats} isBtech={false}></StatsTable>
    </div>
  );
};

export default page;
