'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecruitersProps } from '@/db/models/recruiters.model';
import { delete_recruiter } from '@/app/actions/recruiters/recruiters';
import { useToast } from '@/hooks/use-toast';
import { useEdgeStore } from '@/lib/edgestore';
const RecruitersTable = ({ recruiters }: { recruiters: RecruitersProps[] }) => {
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const [clicked, setClicked] = React.useState(false);
  async function handleDelete(id: string, url: string) {
    setClicked(true);
    try {
      await delete_recruiter(id);
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
          <TableHead>Image</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recruiters.map((recruiter, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="w-[150px]">
                <Avatar className="bg-white w-full rounded-none p-2 object-contain">
                  <AvatarImage src={recruiter.url} />
                  <AvatarFallback>
                    {recruiter.company[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{recruiter.company}</TableCell>
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
                    <Link href={`/recruiters/${recruiter._id}`}>Edit</Link>
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'destructive'}
                    disabled={clicked}
                    onClick={() => {
                      handleDelete(recruiter._id, recruiter.url);
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
};

export default RecruitersTable;
