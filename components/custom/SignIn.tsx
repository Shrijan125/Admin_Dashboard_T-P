'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOffIcon, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Use state to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        description: 'Email and Password are required',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
    });

    if (!res?.error) {
      router.push('/');
    } else if (res.status === 401) {
      toast({
        description: 'Email or Password is incorrect!',
        variant: 'destructive',
      });
    } else {
      toast({ description: 'Something went wrong!', variant: 'destructive' });
    }

    setLoading(false);
  };

  return (
    <div className="w-screen h-screen items-center justify-center border flex">
      <div className="w-[400px] h-[500px] rounded-lg border p-8 flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <div className="relative h-28 w-28 bg-white rounded-full">
            <Image
              fill
              alt="institute-logo"
              src={'/images/IIIT_VADODARA_LOGO.png'}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 mt-12 select-none">
          <div className="flex flex-row items-center w-full gap-2">
            <Input
              placeholder="Email"
              type="email"
              value={email} // Bind the input value to the state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
            <Mail />
          </div>
          <div className="flex flex-row items-center w-full gap-2">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password} // Bind password value to the state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
            {!showPassword ? (
              <EyeOffIcon onClick={handleClick} />
            ) : (
              <Eye className="hover:cursor-pointer" onClick={handleClick} />
            )}
          </div>
          <Button
            className="select-none w-full"
            onClick={handleSubmit}
            disabled={loading}
            size={'lg'}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
