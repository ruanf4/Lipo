
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  const cpfRegex = /^\d{11}$/;
  return cpfRegex.test(cpf.replace(/\D/g, ''));
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10,11}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (match) {
    return !match[2] ? match[1] 
      : !match[3] ? `${match[1]}.${match[2]}`
      : !match[4] ? `${match[1]}.${match[2]}.${match[3]}`
      : `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return cleaned;
};

export const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (match) {
    return !match[2] ? match[1]
      : !match[3] ? `(${match[1]}) ${match[2]}`
      : `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return cleaned;
};
