'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LinkButton = ({ route }: { route: string }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      onClick={() => {
        setClicked(true);
      }}
      disabled={clicked}
      asChild
    >
      <Link href={route}>Add New</Link>
    </Button>
  );
};

export default LinkButton;
