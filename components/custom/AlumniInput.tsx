import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function AlumniInput({
  label,
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        required
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
