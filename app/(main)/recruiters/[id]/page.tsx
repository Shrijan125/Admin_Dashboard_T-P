import { get_recruiters_by_id } from '@/app/actions/recruiters/recruiters';
import ErrorHandler from '@/components/custom/ErrorHandler';
import RecruitersForm from '@/components/custom/RecruitersForm';
import { RecruitersProps } from '@/db/models/recruiters.model';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  let recruiters: RecruitersProps = {
    company: '',
    _id: '',
    url: '',
  };
  try {
    recruiters = await get_recruiters_by_id(id);
  } catch (error) {
    <ErrorHandler
      message={(error as Error).message || 'Something went Wrong!'}
    ></ErrorHandler>;
  }
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-semibold">{recruiters.company}</h1>
      <RecruitersForm
        companyname={recruiters.company}
        imageUrl={recruiters.url}
        id={recruiters._id}
      ></RecruitersForm>
    </div>
  );
};

export default page;
