'use client';
import React from 'react';
import { add_stats } from '@/app/actions/b_tech/b_tech';
import StatsForm from '@/components/custom/StatsForm';
const page = () => {
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-semibold">
        Annual Placement Details (B.Tech)
      </h1>
      <StatsForm
  stats={{
    year: '',
    noofcompaniesvisited: '',
    placementpercentage: '',
    lowestpackage: '',
    lowestpackageunit: '',
    medianpackage: '',
    medianpackageunit: '',
    averagepackage: '',
    averagepackageunit: '',
    highestpackageoncampus: '',
    highestpackageoncampusunit: '',
    highestpackageoffcampus: '',
    highestpackageoffcampusunit: '',
  }}
  allowed={true}
  isBtech={true}
  statsFunction={add_stats}
/>
    </div>
  );
};

export default page;
