
// This is a placeholder for an email service implementation
// In a real application, this would use a backend API to send emails

export interface EmailData {
  recipient: string;
  subject: string;
  body: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  // This is just a mock implementation that logs to console
  // In a real application, this would make an API call to a backend service
  
  console.log("Email would be sent with the following data:");
  console.log("To:", data.recipient);
  console.log("Subject:", data.subject);
  console.log("Body:", data.body);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
};

// Function to send notification when user reaches Page 6
export const sendPageSixNotification = async (userData: any): Promise<boolean> => {
  const recipient = "grupoinovare.2025@hotmail.com";
  const subject = "🚨 Novo usuário chegou à Etapa 6 do QUIZLipoMax!";
  
  // Format current date and time
  const now = new Date();
  const formattedDateTime = now.toLocaleString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const body = `Olá,
Temos novidades! 🎉

Um novo usuário iniciou o cadastro e acabou de chegar à Etapa 6 do processo.

Esse é um ótimo momento para acompanharmos de perto e, se necessário, oferecer suporte para garantir que ele conclua todo o processo.

📌 Detalhes do usuário (se aplicável):

Nome: ${userData.name || '[Nome não fornecido]'}

E-mail: ${userData.email || '[Email não fornecido]'}

Data/Hora: ${formattedDateTime}

Fique de olho e, se possível, entre em contato para reforçar o relacionamento!

Atenciosamente,
Quiz Lipo Max by @ruantrm`;

  return sendEmail({ recipient, subject, body });
};
