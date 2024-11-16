'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { AlumniProp } from '@/db/models/alumni.model';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { delete_alumni } from '@/app/actions/alumni/alumni';
import { useEdgeStore } from '@/lib/edgestore';

export default function AlumniTable({ stats }: { stats: AlumniProp[] }) {
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const [clicked, setClicked] = React.useState(false);
  async function handleDelete(id: string, url: string) {
    setClicked(true);
    try {
      await delete_alumni(id);
    } catch (error) {
      toast({
        description: (error as Error).message || 'Failed to Delete.',
        variant: 'destructive',
      });
    } finally {
      setClicked(false);
    }
    try {
      await edgestore.myPublicImages.delete({ url });
    } catch (error) {
      console.log('Error while deleting Image');
    }
  }
  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Academic Year</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats
          .slice()
          .sort((a, b) => {
            const yearA = parseInt(a.year.split('-')[0], 10) || 0;
            const yearB = parseInt(b.year.split('-')[0], 10) || 1;
            return yearB - yearA;
          })
          .map((stat, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={stat.image} />
                    <AvatarFallback>
                      {stat.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{stat.name}</TableCell>
                <TableCell>{stat.year}</TableCell>
                <TableCell>{stat.company}</TableCell>
                <TableCell>{stat.role}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      size={'sm'}
                      onClick={() => {
                        setClicked(true);
                      }}
                      disabled={clicked}
                      className="bg-green-700 hover:bg-green-800 text-white"
                    >
                      <Link href={`/alumni/${stat._id}`}>Edit</Link>
                    </Button>
                    <Button
                      size={'sm'}
                      variant={'destructive'}
                      disabled={clicked}
                      onClick={() => {
                        handleDelete(stat._id, stat.image);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
