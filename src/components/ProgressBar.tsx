
import { useQuiz } from "@/context/QuizContext";

const ProgressBar: React.FC = () => {
  const { progress } = useQuiz();

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="progress-bar h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
