
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UserSubmission } from "@/types/admin";

const Page7: React.FC = () => {
  const { userData, setCurrentPage } = useQuiz();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async () => {
    setIsSubmitting(true);

    try {
      // Format the data as described in the requirements
      const emailBody = `
📝 Novo pedido do Quiz Lipo Max:
📧 Email: ${userData.email}
👤 Nome: ${userData.name}
🚻 Gênero: ${userData.gender}
📝 CPF: ${userData.cpf}
📍 Cidade: ${userData.city}/${userData.state}
📦 Plano: ${userData.selectedPackage}
💵 Parcelas: ${userData.installments || "6x"}
📅 Vencimento: Dia ${userData.dueDate || "1"}
📱 Telefone: ${userData.phone}
📦 Endereço completo: ${userData.address}, ${userData.number}${userData.complement ? `, ${userData.complement}` : ''}, ${userData.neighborhood}, ${userData.zipCode}
📏 Altura: ${userData.height}m
⚖️ Peso: ${userData.weight}kg
🎂 Idade: ${userData.age}
      `;

      // Log data to console for demonstration
      console.log("Email would be sent to ruanduarte2345@gmail.com with data:");
      console.log(emailBody);

      // Save submission to localStorage for the admin panel
      const submission: UserSubmission = {
        ...userData,
        installments: userData.installments || "6x",
        dueDate: userData.dueDate || "1"
      };

      try {
        // Get existing submissions or initialize empty array
        const existingSubmissions = localStorage.getItem("quizSubmissions");
        const submissions = existingSubmissions 
          ? JSON.parse(existingSubmissions) 
          : [];
        
        // Add new submission and save back to localStorage
        submissions.push(submission);
        localStorage.setItem("quizSubmissions", JSON.stringify(submissions));
      } catch (error) {
        console.error("Error saving submission:", error);
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentPage(8);
    } catch (error) {
      toast({
        title: "Erro ao enviar dados",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-lipomax-primary mb-6 text-center">
        CONFIRME SEUS DADOS
      </h2>

      <div className="w-full max-w-lg bg-lipomax-light p-6 rounded-lg mb-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Nome:</p>
              <p className="font-medium">{userData.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Email:</p>
              <p className="font-medium">{userData.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Telefone:</p>
              <p className="font-medium">{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Plano:</p>
              <p className="font-medium">{userData.selectedPackage}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Parcelas:</p>
              <p className="font-medium">{userData.installments || "6x"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Vencimento:</p>
              <p className="font-medium">Dia {userData.dueDate || "1"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">Endereço:</p>
            <p className="font-medium">
              {userData.address}, {userData.number}
              {userData.complement ? `, ${userData.complement}` : ''}, {userData.neighborhood}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Cidade:</p>
              <p className="font-medium">{userData.city}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Estado:</p>
              <p className="font-medium">{userData.state}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">Peso:</p>
              <p className="font-medium">{userData.weight}kg</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Altura:</p>
              <p className="font-medium">{userData.height}m</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Idade:</p>
              <p className="font-medium">{userData.age} anos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold text-lipomax-secondary mb-2">
          ÚLTIMO CLIQUE PARA SUA VIDA MUDAR
        </h3>
        <p className="text-gray-600">
          Confirme seus dados e clique no botão abaixo para finalizar seu pedido.
        </p>
      </div>

      <Button
        onClick={sendEmail}
        disabled={isSubmitting}
        className="cta-button group flex items-center gap-2"
      >
        {isSubmitting ? (
          "PROCESSANDO..."
        ) : (
          <>
            FINALIZAR COMPRA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </div>
  );
};

export default Page7;
