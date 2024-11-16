'use client';
import React from 'react';
import PlacementPackageInput from '@/components/custom/PlacementPackageInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface StatsFormProps {
  year: string;
  noofcompaniesvisited: string;
  placementpercentage: string;
  lowestpackage: string;
  lowestpackageunit: string;
  medianpackage: string;
  medianpackageunit: string;
  averagepackage: string;
  averagepackageunit: string;
  highestpackageoncampus: string;
  highestpackageoncampusunit: string;
  highestpackageoffcampus: string;
  highestpackageoffcampusunit: string;
}

const StatsForm = ({
  stats: {
    year,
    noofcompaniesvisited,
    placementpercentage,
    lowestpackage,
    lowestpackageunit,
    medianpackage,
    medianpackageunit,
    averagepackage,
    averagepackageunit,
    highestpackageoncampus,
    highestpackageoncampusunit,
    highestpackageoffcampus,
    highestpackageoffcampusunit,
  },
  allowed,
  isBtech,
  statsFunction,
}: {
  stats: StatsFormProps;
  allowed: boolean;
  isBtech: boolean;
  statsFunction: (formdata: FormData) => Promise<void>;
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const handleAction = async (formdata: FormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      await statsFunction(formdata);
    } catch (error) {
      toast({
        description: (error as Error).message || 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const [formdata, setFormData] = React.useState({
    year,
    noofcompaniesvisited,
    placementpercentage,
    lowestpackage,
    lowestpackageunit,
    medianpackage,
    medianpackageunit,
    averagepackage,
    averagepackageunit,
    highestpackageoncampus,
    highestpackageoncampusunit,
    highestpackageoffcampus,
    highestpackageoffcampusunit,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAction(new FormData(e.currentTarget));
        }}
        className="grid grid-cols-2 gap-x-8 mt-8 gap-y-14"
      >
        <div>
          <Label htmlFor="year">
            Academic Year *{' '}
            {!allowed && (
              <span className="text-red-400 text-sm">(* Can't be changed)</span>
            )}
          </Label>
          <Input
            required
            name="year"
            id="year"
            placeholder="2019-20"
            value={formdata.year}
            readOnly={!allowed}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="No. of Companies Visited">
            {isBtech
              ? 'No. of Companies Visited *'
              : 'No. of Companies Visited'}
          </Label>
          <Input
            name="noofcompaniesvisited"
            id="No. of Companies Visited"
            placeholder="53"
            value={formdata.noofcompaniesvisited}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="Placement Percentage">Placement Percentage *</Label>
          <Input
            name="placementpercentage"
            id="Placement Percentage"
            placeholder="96.34"
            value={formdata.placementpercentage}
            onChange={handleChange}
          />
        </div>

        <PlacementPackageInput
          title="Lowest Package"
          placeholder="4"
          value={formdata.lowestpackage}
          onChange={handleChange}
          name="lowestpackage"
          isRequired={true}
        />
        <PlacementPackageInput
          title="Median Package"
          placeholder="13"
          value={formdata.medianpackage}
          onChange={handleChange}
          name="medianpackage"
          isRequired={isBtech}
        />
        <PlacementPackageInput
          title="Average Package"
          placeholder="16"
          value={formdata.averagepackage}
          onChange={handleChange}
          name="averagepackage"
          isRequired={true}
        />
        <PlacementPackageInput
          title="Highest Package On Campus"
          placeholder="20"
          value={formdata.highestpackageoncampus}
          onChange={handleChange}
          name="highestpackageoncampus"
          isRequired={true}
        />
        <PlacementPackageInput
          title="Highest Package Off Campus"
          placeholder="60"
          value={formdata.highestpackageoffcampus}
          onChange={handleChange}
          name="highestpackageoffcampus"
        />

        <Button
          className="col-span-2 w-1/4 mx-auto"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Update'
          )}
        </Button>
      </form>
      <div className="text-gray-200/50 text-center mt-20">
        Fields marked in * indicates required field.
      </div>
    </>
  );
};

export default StatsForm;
