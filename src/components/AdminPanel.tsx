
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserSubmission } from "@/types/admin";

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch from a backend
    // For demo purposes, we'll retrieve from localStorage
    const loadSavedData = () => {
      try {
        const savedData = localStorage.getItem("quizSubmissions");
        if (savedData) {
          setSubmissions(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading saved submissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  return (
    <div className="space-y-4 max-w-5xl w-full mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-lipomax-primary">
          Painel Administrativo
        </h2>
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-gray-500">Carregando dados...</div>
      ) : submissions.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          Nenhuma submissão encontrada.
        </div>
      ) : (
        <Tabs defaultValue="list">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista</TabsTrigger>
            <TabsTrigger value="cards">Cartões</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Submissões do Quiz</CardTitle>
                <CardDescription>
                  Total de {submissions.length} registros encontrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-6">
                    {submissions.map((submission, index) => (
                      <div 
                        key={index} 
                        className="border-l-4 border-lipomax-primary pl-4 py-2"
                      >
                        <h3 className="font-bold text-lg">{submission.name}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div><span className="font-semibold">Email:</span> {submission.email}</div>
                          <div><span className="font-semibold">Telefone:</span> {submission.phone}</div>
                          <div><span className="font-semibold">CPF:</span> {submission.cpf}</div>
                          <div><span className="font-semibold">Endereço:</span> {submission.address}, {submission.number}</div>
                          <div><span className="font-semibold">Complemento:</span> {submission.complement || "-"}</div>
                          <div><span className="font-semibold">Bairro:</span> {submission.neighborhood}</div>
                          <div><span className="font-semibold">Cidade/UF:</span> {submission.city}/{submission.state}</div>
                          <div><span className="font-semibold">CEP:</span> {submission.zipCode}</div>
                          <div><span className="font-semibold">Plano:</span> {submission.selectedPackage}</div>
                          <div><span className="font-semibold">Parcelas:</span> {submission.installments}</div>
                          <div><span className="font-semibold">Vencimento:</span> Dia {submission.dueDate}</div>
                          <div><span className="font-semibold">Altura:</span> {submission.height}m</div>
                          <div><span className="font-semibold">Peso:</span> {submission.weight}kg</div>
                          <div><span className="font-semibold">Idade:</span> {submission.age} anos</div>
                          <div><span className="font-semibold">Gênero:</span> {submission.gender}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cards" className="mt-4">
            <ScrollArea className="h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {submissions.map((submission, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-lipomax-primary to-lipomax-secondary text-white">
                      <CardTitle>{submission.name}</CardTitle>
                      <CardDescription className="text-white/80">
                        {submission.email} | {submission.phone}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div><span className="font-semibold">Plano:</span> {submission.selectedPackage}</div>
                          <div><span className="font-semibold">Parcelas:</span> {submission.installments}</div>
                        </div>
                        <div>
                          <span className="font-semibold">Endereço:</span> {submission.address}, {submission.number}, {submission.neighborhood}
                        </div>
                        <div><span className="font-semibold">Cidade/UF:</span> {submission.city}/{submission.state}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div><span className="font-semibold">Peso:</span> {submission.weight}kg</div>
                          <div><span className="font-semibold">Altura:</span> {submission.height}m</div>
                          <div><span className="font-semibold">Idade:</span> {submission.age} anos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminPanel;
