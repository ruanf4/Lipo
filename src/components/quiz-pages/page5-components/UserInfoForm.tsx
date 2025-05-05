
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuiz } from "@/context/QuizContext";
import { formatCPF, formatPhone } from "@/utils/formValidation";

interface UserInfoFormProps {
  errors: {
    email: boolean;
    name: boolean;
    gender: boolean;
    cpf: boolean;
    phone: boolean;
    city: boolean;
  };
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ errors }) => {
  const { userData, updateUserData } = useQuiz();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lipomax-primary font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={userData.email}
          onChange={(e) => updateUserData({ email: e.target.value })}
          className={`form-input ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            Email inválido ou não preenchido
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-lipomax-primary font-medium">
          Nome completo
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          value={userData.name}
          onChange={(e) => updateUserData({ name: e.target.value })}
          className={`form-input ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Campo obrigatório</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-lipomax-primary font-medium">
          Gênero
        </Label>
        <RadioGroup
          value={userData.gender}
          onValueChange={(value) => updateUserData({ gender: value as "masculino" | "feminino" })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="masculino" id="masculino" />
            <Label htmlFor="masculino">Masculino</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="feminino" id="feminino" />
            <Label htmlFor="feminino">Feminino</Label>
          </div>
        </RadioGroup>
        {errors.gender && (
          <p className="text-red-500 text-sm">Selecione uma opção</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf" className="text-lipomax-primary font-medium">
          CPF
        </Label>
        <Input
          id="cpf"
          type="text"
          placeholder="000.000.000-00"
          value={userData.cpf}
          onChange={(e) => {
            const formatted = formatCPF(e.target.value);
            updateUserData({ cpf: formatted });
          }}
          maxLength={14}
          className={`form-input ${errors.cpf ? "border-red-500" : ""}`}
        />
        {errors.cpf && (
          <p className="text-red-500 text-sm">CPF inválido ou não preenchido</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-lipomax-primary font-medium">
          Telefone com DDD
        </Label>
        <Input
          id="phone"
          type="text"
          placeholder="(00) 00000-0000"
          value={userData.phone}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            updateUserData({ phone: formatted });
          }}
          maxLength={15}
          className={`form-input ${errors.phone ? "border-red-500" : ""}`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">
            Telefone inválido ou não preenchido
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-lipomax-primary font-medium">
          Cidade
        </Label>
        <Input
          id="city"
          type="text"
          placeholder="Sua cidade"
          value={userData.city}
          onChange={(e) => updateUserData({ city: e.target.value })}
          className={`form-input ${errors.city ? "border-red-500" : ""}`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm">Campo obrigatório</p>
        )}
      </div>
    </>
  );
};

export default UserInfoForm;
