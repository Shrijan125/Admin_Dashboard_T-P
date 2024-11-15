import { get_mtech_stats_by_id, update_mtech_stats } from '@/app/actions/m_tech/m_tech';
import ErrorHandler from '@/components/custom/ErrorHandler';
import StatsForm from '@/components/custom/StatsForm';
import { StatsFormProps } from '@/db/models/btech.model';
import React from 'react'

const page = async ({params}:{params:{id:string}}) => {
    const {id} = params;
    let data: StatsFormProps = {
        _id: '',
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
      };
      try {
        data = await get_mtech_stats_by_id(id);
      } catch (error) {
        return (
          <ErrorHandler
            message={(error as Error).message || 'Something went Wrong!'}
          />
        );
      }
  return (
    <div className="mt-4 px-6">
    <h1 className="text-2xl font-semibold">
      {data.year} Placement Details (M.Tech)
    </h1>
    <StatsForm
      stats={{
        year: data.year,
        noofcompaniesvisited: data.noofcompaniesvisited,
        placementpercentage: data.placementpercentage,
        lowestpackage: data.lowestpackage,
        lowestpackageunit: data.lowestpackageunit,
        medianpackage: data.medianpackage,
        medianpackageunit: data.medianpackageunit,
        averagepackage: data.averagepackage,
        averagepackageunit: data.averagepackageunit,
        highestpackageoncampus: data.highestpackageoncampus,
        highestpackageoncampusunit: data.highestpackageoncampusunit,
        highestpackageoffcampus: data.highestpackageoffcampus,
        highestpackageoffcampusunit: data.highestpackageoffcampusunit,
      }}
      allowed={false}
      isBtech={false}
      statsFunction={update_mtech_stats}
    />
  </div>
  )
}

export default page