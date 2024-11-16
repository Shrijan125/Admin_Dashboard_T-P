import { add_stats_mtech } from '@/app/actions/m_tech/m_tech';
import StatsForm from '@/components/custom/StatsForm';
import React from 'react';

const page = () => {
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-semibold">
        Annual Placement Details (M.Tech)
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
        isBtech={false}
        allowed={true}
        statsFunction={add_stats_mtech}
      />
    </div>
  );
};

export default page;
