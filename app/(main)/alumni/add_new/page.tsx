import AlumniForm from '@/components/custom/AlumniForm';

const page = () => {
  return (
    <div className="mt-4 px-6">
      <h1 className="text-2xl font-semibold">Alumni Details</h1>
      <AlumniForm name="" role="" imageUrl="" company="" year=""></AlumniForm>
    </div>
  );
};

export default page;
