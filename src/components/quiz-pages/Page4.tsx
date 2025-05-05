
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Page4: React.FC = () => {
  const { userData, updateUserData, setCurrentPage } = useQuiz();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(
    userData.selectedPackage || "6 meses: 6x de 129,90R$"
  );

  const handlePackageSelect = (pkg: string) => {
    setSelectedPackage(pkg);
    updateUserData({ selectedPackage: pkg as any });
  };

  const handleNext = () => {
    if (!selectedPackage) {
      toast({
        title: "Selecione um pacote",
        description: "Por favor, escolha um pacote para continuar.",
        variant: "destructive",
      });
      return;
    }
    setCurrentPage(5);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-lipomax-primary mb-4 text-center">
        TRATAMENTO IDEAL PRA VOCÊ
      </h2>
      
      <div className="w-full max-w-2xl mb-8">
        {/* 6 meses package */}
        <div
          className={`package-card cursor-pointer ${
            selectedPackage === "6 meses: 6x de 129,90R$" ? "selected" : ""
          }`}
          onClick={() => handlePackageSelect("6 meses: 6x de 129,90R$")}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-lipomax-primary">6 meses</h3>
            <div className="bg-lipomax-secondary rounded-full p-1">
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="bg-lipomax-light rounded-lg p-4 mb-4">
            <img
              src="/lovable-uploads/8a56e04e-a793-4c8b-87ba-bd93b3d5672b.png"
              alt="Pacote 6 meses"
              className="w-full h-auto rounded-md mb-3"
            />
          </div>
          <div className="text-center">
            <span className="inline-block bg-lipomax-secondary text-white rounded-full px-3 py-1 text-sm font-semibold">
              Mais popular
            </span>
          </div>
        </div>
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

export default Page4;
