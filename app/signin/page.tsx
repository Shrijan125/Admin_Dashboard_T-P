import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import SignIn from '@/components/custom/SignIn';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  }
  return <SignIn></SignIn>;
}
