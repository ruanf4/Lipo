
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";

const Page1: React.FC = () => {
  const { setCurrentPage } = useQuiz();

  const handleNext = () => {
    setCurrentPage(2);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-lipomax-primary mb-8">
        Você só começa a pagar após chegar na sua casa! Aproveite hoje… últimas unidades
      </h1>

      <div className="w-full max-w-md mb-6 relative">
        <img
          src="/lovable-uploads/96ccf297-1b90-48ad-8671-f08bab18a15a.png"
          alt="Lipo Max Turbo - Queima até dormindo!"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>

      <Button
        onClick={handleNext}
        className="cta-button group flex items-center gap-2"
      >
        QUERO FAZER MINHA AVALIAÇÃO
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Page1;
