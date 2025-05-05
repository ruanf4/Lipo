
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DueDateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DueDateSelect: React.FC<DueDateSelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="dueDate" className="text-lipomax-primary font-medium block">
        Qual o dia para o vencimento do seu boleto
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full rounded-xl border-2 p-3">
          <SelectValue placeholder="Selecione o dia" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {[...Array(31)].map((_, i) => (
            <SelectItem key={i+1} value={(i+1).toString()}>
              Dia {i+1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DueDateSelect;
