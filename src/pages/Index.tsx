
import { QuizProvider } from "@/context/QuizContext";
import Quiz from "@/components/Quiz";

const Index = () => {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-lipomax-light">
        <Quiz />
      </div>
    </QuizProvider>
  );
};

export default Index;
