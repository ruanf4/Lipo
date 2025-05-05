
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { validateEmail, validateCPF, validatePhone } from "@/utils/formValidation";
import InstallmentsSelect from "./page5-components/InstallmentsSelect";
import DueDateSelect from "./page5-components/DueDateSelect";
import UserInfoForm from "./page5-components/UserInfoForm";

const Page5: React.FC = () => {
  const { userData, updateUserData, setCurrentPage } = useQuiz();
  const { toast } = useToast();
  const [errors, setErrors] = useState({
    email: false,
    name: false,
    gender: false,
    cpf: false,
    phone: false,
    city: false,
  });
  const [installments, setInstallments] = useState(userData.installments || "1x");
  const [dueDate, setDueDate] = useState(userData.dueDate || "1");

  const validateForm = () => {
    const newErrors = {
      email: !userData.email || !validateEmail(userData.email),
      name: !userData.name,
      gender: !userData.gender,
      cpf: !userData.cpf || !validateCPF(userData.cpf),
      phone: !userData.phone || !validatePhone(userData.phone),
      city: !userData.city,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (validateForm()) {
      updateUserData({ 
        installments,
        dueDate
      });
      setCurrentPage(6);
    } else {
      toast({
        title: "Verifique os campos",
        description: "Por favor, preencha todos os campos corretamente.",
        variant: "destructive",
      });
    }
  };

  const handleInstallmentsChange = (value: string) => {
    setInstallments(value);
    updateUserData({ installments: value });
  };

  const handleDueDateChange = (value: string) => {
    setDueDate(value);
    updateUserData({ dueDate: value });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-lipomax-primary mb-6 text-center">
        QUASE LA! COMPRE AGORA EM ATÉ 6X NO BOLETO
      </h2>

      <div className="w-full max-w-lg space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InstallmentsSelect value={installments} onChange={handleInstallmentsChange} />
          <DueDateSelect value={dueDate} onChange={handleDueDateChange} />
        </div>

        <UserInfoForm errors={errors} />
      </div>

      <Button
        onClick={handleNext}
        className="cta-button group flex items-center gap-2"
      >
        CONTINUAR
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Page5;
