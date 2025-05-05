
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Page2: React.FC = () => {
  const { userData, updateUserData, setCurrentPage } = useQuiz();
  const { toast } = useToast();
  const [errors, setErrors] = useState({
    weight: false,
    age: false,
    height: false,
  });

  const validateForm = () => {
    const newErrors = {
      weight: !userData.weight,
      age: !userData.age,
      height: !userData.height,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentPage(3);
    } else {
      toast({
        title: "Preencha todos os campos",
        description: "Por favor, preencha todos os campos para continuar.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-lipomax-secondary mb-8 text-center">
        QUEIMA GORDURA - TIRA LÍQUIDO RETIDO - DESINFLAMA - 2KG POR SEMANA
      </h2>

      <div className="w-full max-w-md space-y-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-lipomax-primary font-medium">
            Qual é seu peso hoje? (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="Ex: 75"
            value={userData.weight}
            onChange={(e) => updateUserData({ weight: e.target.value })}
            className={`form-input ${errors.weight ? "border-red-500" : ""}`}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">Campo obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-lipomax-primary font-medium">
            Qual é sua idade? (anos)
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Ex: 35"
            value={userData.age}
            onChange={(e) => updateUserData({ age: e.target.value })}
            className={`form-input ${errors.age ? "border-red-500" : ""}`}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">Campo obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="text-lipomax-primary font-medium">
            Qual é sua altura? (m)
          </Label>
          <Input
            id="height"
            type="text"
            placeholder="Ex: 1.70"
            value={userData.height}
            onChange={(e) => updateUserData({ height: e.target.value })}
            className={`form-input ${errors.height ? "border-red-500" : ""}`}
          />
          {errors.height && (
            <p className="text-red-500 text-sm">Campo obrigatório</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleNext}
        className="cta-button group flex items-center gap-2"
      >
        PRÓXIMO
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Page2;
