import { get_alumni_by_id, update_alumni } from '@/app/actions/alumni/alumni';
import AlumniForm from '@/components/custom/AlumniForm';
import ErrorHandler from '@/components/custom/ErrorHandler';
import { Alumni, AlumniProp } from '@/db/models/alumni.model';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  let data: AlumniProp = {
    name: '',
    role: '',
    year: '',
    company: '',
    image: '',
    _id: '',
  };
  try {
    data = await get_alumni_by_id(id);
  } catch (error) {
    <ErrorHandler
      message={(error as Error).message || 'Something went Wrong!'}
    ></ErrorHandler>;
  }
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <AlumniForm
        company={data.company}
        role={data.role}
        imageUrl={data.image}
        year={data.year}
        name={data.name}
        id={id}
      ></AlumniForm>
    </div>
  );
};

export default page;
