'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import createAdmin from '@/app/actions/admin/create_admin';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const CreateAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  async function handleClick() {
    setLoading(true);
    if (!email || !password || !name) {
      toast({
        description: 'All fields are mandatory!',
        variant: 'destructive',
      });
      return;
    }
    try {
      await createAdmin({ email, name, password });
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'An unknown error occurred.';
      toast({ description: errorMessage, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[400px]  h-[500px] rounded-lg border p-8 flex flex-col gap-4">
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Admin Name"
        ></Input>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
        ></Input>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        ></Input>
        <Button
          disabled={loading ? true : false}
          className="w-full"
          onClick={handleClick}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Create Admin'
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateAdmin;
