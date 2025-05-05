
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InstallmentsSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const InstallmentsSelect: React.FC<InstallmentsSelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="installments" className="text-lipomax-primary font-medium block">
        Em quantas parcelas deseja comprar
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full rounded-xl border-2 p-3">
          <SelectValue placeholder="Selecione as parcelas" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {[...Array(6)].map((_, i) => (
            <SelectItem key={i+1} value={(i+1) + "x"}>
              {i+1}x
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InstallmentsSelect;
