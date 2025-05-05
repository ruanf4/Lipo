
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Users } from "lucide-react";
import AdminPanel from "./AdminPanel";

const AdminButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "adminlipo" && password === "lipomax") {
      setIsAuthenticated(true);
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao painel de administração",
      });
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Usuário ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 rounded-full shadow-lg bg-lipomax-primary text-white hover:bg-lipomax-secondary"
        onClick={() => setIsOpen(true)}
      >
        <Users className="h-5 w-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`${isAuthenticated ? 'sm:max-w-5xl w-[95vw]' : 'sm:max-w-md'}`}>
          {!isAuthenticated ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-lipomax-primary">
                  Acesso Administrativo
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-lipomax-primary hover:bg-lipomax-secondary"
                >
                  Entrar
                </Button>
              </form>
            </>
          ) : (
            <AdminPanel onClose={() => setIsOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminButton;
