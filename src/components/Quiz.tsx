
import { useQuiz } from "@/context/QuizContext";
import QuizLayout from "./QuizLayout";
import Page1 from "./quiz-pages/Page1";
import Page2 from "./quiz-pages/Page2";
import Page3 from "./quiz-pages/Page3";
import Page4 from "./quiz-pages/Page4";
import Page5 from "./quiz-pages/Page5";
import Page6 from "./quiz-pages/Page6";
import Page7 from "./quiz-pages/Page7";
import Page8 from "./quiz-pages/Page8";

const Quiz = () => {
  const { currentPage } = useQuiz();

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 />;
      case 4:
        return <Page4 />;
      case 5:
        return <Page5 />;
      case 6:
        return <Page6 />;
      case 7:
        return <Page7 />;
      case 8:
        return <Page8 />;
      default:
        return <Page1 />;
    }
  };

  // Don't show progress bar on the success page
  const showProgress = currentPage < 8;

  return <QuizLayout showProgress={showProgress}>{renderPage()}</QuizLayout>;
};

export default Quiz;
