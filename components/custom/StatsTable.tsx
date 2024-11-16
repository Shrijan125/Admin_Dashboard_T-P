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
import { StatsFormProps } from '@/db/models/btech.model';
import { delete_btech_stats } from '@/app/actions/b_tech/b_tech';
import { stat } from 'fs';
import { delete_mtech_stats } from '@/app/actions/m_tech/m_tech';
import { useToast } from '@/hooks/use-toast';
import { set } from 'mongoose';
const StatsTable = ({
  stats,
  isBtech,
}: {
  stats: StatsFormProps[];
  isBtech: boolean;
}) => {
  const { toast } = useToast();
  const [clicked, setClicked] = React.useState(false);
  async function handleClick(id: string, isBtech: boolean) {
    setClicked(!clicked);
    if (isBtech) {
      try {
        await delete_btech_stats(id);
      } catch (error) {
        toast({
          description: (error as Error).message || 'Failed to Delete.',
          variant: 'destructive',
        });
      } finally {
        setClicked(false);
      }
    } else {
      try {
        await delete_mtech_stats(id);
      } catch (error) {
        toast({
          description: (error as Error).message || 'Failed to Delete.',
          variant: 'destructive',
        });
      } finally {
        setClicked(false);
      }
    }
  }

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>Academic Year</TableHead>
          <TableHead>Lowest</TableHead>
          <TableHead>Median</TableHead>
          <TableHead>Average</TableHead>
          <TableHead>Highest (On Campus)</TableHead>
          <TableHead>Highest (Off Campus)</TableHead>
          <TableHead>No. of Companies</TableHead>
          <TableHead>Placement Percentage</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats
          .slice()
          .reverse()
          .map((stat, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{stat.year}</TableCell>
                <TableCell>
                  {stat.lowestpackage} {stat.lowestpackageunit.toUpperCase()}
                </TableCell>
                <TableCell>
                  {stat.medianpackage ? (
                    `${stat.medianpackage} ${stat.medianpackageunit.toUpperCase()}`
                  ) : (
                    <span className="text-red-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {stat.averagepackage} {stat.averagepackageunit.toUpperCase()}
                </TableCell>
                <TableCell>
                  {stat.highestpackageoncampus}{' '}
                  {stat.highestpackageoncampusunit.toUpperCase()}
                </TableCell>
                <TableCell>
                  {stat.highestpackageoffcampus ? (
                    `${stat.highestpackageoffcampus} 
                  ${stat.highestpackageoffcampusunit.toUpperCase()}`
                  ) : (
                    <span className="text-red-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {stat.noofcompaniesvisited ? (
                    stat.noofcompaniesvisited
                  ) : (
                    <span className="text-red-400">N/A</span>
                  )}
                </TableCell>
                <TableCell>{stat.placementpercentage}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      size={'sm'}
                      className="bg-green-700 hover:bg-green-800 text-white"
                      onClick={() => setClicked(true)}
                      disabled={clicked}
                    >
                      <Link
                        href={
                          isBtech
                            ? `/btech_statistics/${stat._id}`
                            : `/mtech_statistics/${stat._id}`
                        }
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      size={'sm'}
                      variant={'destructive'}
                      onClick={() => {
                        handleClick(stat._id, isBtech);
                      }}
                      disabled={clicked}
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

export default StatsTable;
