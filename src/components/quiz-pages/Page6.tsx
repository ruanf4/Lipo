
import { ArrowRight } from "lucide-react";
import { useQuiz } from "@/context/QuizContext";
import AddressForm from "./page6-components/AddressForm";
import { usePageSixNotification } from "./page6-components/useNotification";

const Page6: React.FC = () => {
  const { userData, setCurrentPage } = useQuiz();
  
  // Send notification email when component mounts (user reaches this page)
  usePageSixNotification(userData);

  const handleNext = () => {
    setCurrentPage(7);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-lipomax-primary mb-6 text-center">
        INFORMAÇÕES DE ENTREGA
      </h2>

      <AddressForm onValidSubmit={handleNext} />
    </div>
  );
};

export default Page6;
