import RecruitersForm from '@/components/custom/RecruitersForm';
import React from 'react';

const page = () => {
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-semibold">Recruiter Details</h1>
      <RecruitersForm companyname="" imageUrl=""></RecruitersForm>
    </div>
  );
};

export default page;
