import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";

// Lista de estados brasileiros
const brazilianStates = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

interface FormErrors {
  zipCode: boolean;
  address: boolean;
  number: boolean;
  neighborhood: boolean;
  state: boolean;
}

interface AddressFormProps {
  onValidSubmit: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onValidSubmit }) => {
  const { userData, updateUserData } = useQuiz();
  const { toast } = useToast();
  const [errors, setErrors] = useState<FormErrors>({
    zipCode: false,
    address: false,
    number: false,
    neighborhood: false,
    state: false,
  });
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  const validateForm = () => {
    const zipRegex = /^\d{8}$/;

    const newErrors: FormErrors = {
      zipCode: !userData.zipCode || !zipRegex.test(userData.zipCode.replace(/\D/g, "")),
      address: !userData.address,
      number: !userData.number,
      neighborhood: !userData.neighborhood,
      state: !userData.state,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onValidSubmit();
    } else {
      toast({
        title: "Verifique os campos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
    }
  };

  const formatZipCode = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
    if (match) {
      return match[2] ? `${match[1]}-${match[2]}` : match[1];
    }
    return cleaned;
  };

  const searchCEP = async () => {
    const cep = userData.zipCode.replace(/\D/g, "");
    if (cep.length !== 8) {
      toast({
        title: "CEP Inválido",
        description: "Por favor, insira um CEP válido com 8 dígitos.",
        variant: "destructive",
      });
      return;
    }

    setIsSearchingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "O CEP informado não foi encontrado.",
          variant: "destructive",
        });
      } else {
        updateUserData({
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSearchingCep(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-4 mb-8">
      {/* CEP */}
      <div className="space-y-2">
        <Label htmlFor="zipCode" className="text-lipomax-primary font-medium">
          CEP*
        </Label>
        <div className="flex gap-2">
          <Input
            id="zipCode"
            placeholder="00000-000"
            value={userData.zipCode}
            onChange={(e) => updateUserData({ zipCode: formatZipCode(e.target.value) })}
            maxLength={9}
            className={`form-input flex-1 ${errors.zipCode ? "border-red-500" : ""}`}
          />
          <Button
            type="button"
            onClick={searchCEP}
            disabled={isSearchingCep}
            className="bg-lipomax-primary hover:bg-lipomax-dark"
          >
            {isSearchingCep ? "Buscando..." : "Buscar"}
          </Button>
        </div>
        {errors.zipCode && (
          <p className="text-red-500 text-sm">CEP inválido ou não preenchido</p>
        )}
      </div>

      {/* Endereço */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-lipomax-primary font-medium">
          Endereço*
        </Label>
        <Input
          id="address"
          placeholder="Rua, Avenida, etc."
          value={userData.address}
          onChange={(e) => updateUserData({ address: e.target.value })}
          className={`form-input ${errors.address ? "border-red-500" : ""}`}
        />
        {errors.address && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      {/* Número e Complemento */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number" className="text-lipomax-primary font-medium">
            Número*
          </Label>
          <Input
            id="number"
            placeholder="123"
            value={userData.number}
            onChange={(e) => updateUserData({ number: e.target.value })}
            className={`form-input ${errors.number ? "border-red-500" : ""}`}
          />
          {errors.number && <p className="text-red-500 text-sm">Campo obrigatório</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="complement" className="text-lipomax-primary font-medium">
            Complemento
          </Label>
          <Input
            id="complement"
            placeholder="Apto, Bloco, etc."
            value={userData.complement}
            onChange={(e) => updateUserData({ complement: e.target.value })}
            className="form-input"
          />
        </div>
      </div>

      {/* Bairro */}
      <div className="space-y-2">
        <Label htmlFor="neighborhood" className="text-lipomax-primary font-medium">
          Bairro*
        </Label>
        <Input
          id="neighborhood"
          placeholder="Seu bairro"
          value={userData.neighborhood}
          onChange={(e) => updateUserData({ neighborhood: e.target.value })}
          className={`form-input ${errors.neighborhood ? "border-red-500" : ""}`}
        />
        {errors.neighborhood && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      {/* Estado */}
      <div className="space-y-2">
        <Label htmlFor="state" className="text-lipomax-primary font-medium">
          Estado*
        </Label>
        <Select
          value={userData.state}
          onValueChange={(value) => updateUserData({ state: value })}
        >
          <SelectTrigger className={`form-input ${errors.state ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            {brazilianStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && <p className="text-red-500 text-sm">Campo obrigatório</p>}
      </div>

      {/* Botão Final */}
      <Button
        onClick={handleSubmit}
        className="cta-button group flex items-center gap-2 w-full md:w-auto"
      >
        CONTINUAR
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default AddressForm;
