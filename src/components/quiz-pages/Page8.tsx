
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Page8: React.FC = () => {
  const handleWhatsAppClick = () => {
    // Format phone number for WhatsApp - updated with the provided number
    const phoneNumber = "5564922987730"; // The provided number: +55 64 9229-8773
    const message = "Olá! Acabei de fazer um pedido do Lipo Max e gostaria de mais informações.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <Check className="h-16 w-16 text-lipomax-secondary" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-lipomax-primary mb-6">
        COMPRA REALIZADA COM SUCESSO!
      </h2>

      <div className="max-w-md mb-8">
        <p className="text-gray-700 mb-4">
          Seu pedido foi registrado com sucesso! Nossa equipe entrará em contato
          em breve para confirmar os detalhes do seu pedido.
        </p>
        <p className="text-gray-700 font-medium">
          Você também pode entrar em contato diretamente conosco pelo WhatsApp
          clicando no botão abaixo.
        </p>
      </div>

      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a0.5.0.5 0 0 0 1 0V9a0.5.0.5 0 0 0-1 0v1zm0 0a0.5.5 0 0 0 1 0v-1a0.5.0.5 0 0 0-1 0v1zm5 0a0.5.5 0 0 0 1 0V9a0.5.0.5 0 0 0-1 0v1zm0 0a0.5.5 0 0 0 1 0v-1a0.5.0.5 0 0 0-1 0v1z" />
        </svg>
        CHAMAR A EQUIPE
      </Button>
    </div>
  );
};

export default Page8;
