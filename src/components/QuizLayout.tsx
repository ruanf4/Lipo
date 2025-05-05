
import React from "react";
import ProgressBar from "./ProgressBar";
import { useQuiz } from "@/context/QuizContext";

interface QuizLayoutProps {
  children: React.ReactNode;
  showProgress?: boolean;
}

const QuizLayout: React.FC<QuizLayoutProps> = ({ children, showProgress = true }) => {
  const { currentPage } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lipomax-light py-8 px-4">
      <div className="quiz-container bg-white shadow-lg rounded-2xl p-6 md:p-8">
        {showProgress && <ProgressBar />}
        <div className="mb-4 text-xs text-gray-500 text-center">
          Etapa {currentPage} de 8
        </div>
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
