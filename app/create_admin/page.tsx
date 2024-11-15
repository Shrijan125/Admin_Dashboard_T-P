import CreateAdmin from '@/components/custom/CreateAdmin';
import verifyUser from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function createAdmin() {
  const session = await verifyUser();
  if (!session) {
    redirect('/signin');
  }
  return <CreateAdmin></CreateAdmin>;
}
