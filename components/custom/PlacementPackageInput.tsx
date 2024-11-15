import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PlacementPackageInputProps {
  title: string;
  placeholder: string;
  value: string;
  name: string;
  isRequired?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlacementPackageInput = ({
  title,
  placeholder,
  value,
  name,
  isRequired = false,
  onChange,
}: PlacementPackageInputProps) => {
  return (
    <div>
      <Label htmlFor={title}>{title} {isRequired && '*'}</Label>
      <div className="flex gap-1">
        <Input
          required={isRequired}
          name={name}
          id={title}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Select defaultValue="lpa" name={`${name}unit`}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lpa">LPA</SelectItem>
            <SelectItem value="cpa">CPA</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PlacementPackageInput;
