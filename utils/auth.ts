import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function verifyUser() {
  const session = await getServerSession(authOptions);
  return session;
}
