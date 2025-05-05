
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Page3: React.FC = () => {
  const { setCurrentPage } = useQuiz();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNext = () => {
    setCurrentPage(4);
  };

  useEffect(() => {
    // Dynamically load Vimeo Player script
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-bold text-lipomax-primary mb-6 text-center">
        ASSISTA AO VÍDEO PARA ENTENDER COMO O LIPO MAX FUNCIONA
      </h2>

      <div className="w-full max-w-2xl mb-8 rounded-lg overflow-hidden aspect-video relative">
        <div style={{padding: "56.25% 0 0 0", position: "relative"}}>
          <iframe 
            ref={iframeRef}
            src="https://player.vimeo.com/video/1081518102?h=b68fff81a1&badge=0&autopause=0&player_id=0&app_id=58479" 
            style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}} 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            title="LIPO MAX EMAGRECIMENTO"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      <Button
        onClick={handleNext}
        className="cta-button group flex items-center gap-2"
      >
        QUERO FAZER O MEU PEDIDO AGORA
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Page3;
